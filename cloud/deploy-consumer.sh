#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$0")"
source "${SCRIPT_DIR}/config.sh"

# Load NFA_PROXY_URL from temp file if it exists
if [ -f "${SCRIPT_DIR}/.env.tmp" ]; then
    source "${SCRIPT_DIR}/.env.tmp"
fi

if [ -z "$NFA_PROXY_URL" ]; then
    echo "Error: NFA_PROXY_URL not set"
    echo "Make sure to run deploy-proxy.sh first"
    exit 1
fi

# Set image tag based on version if specified
IMAGE_TAG="${CONSUMER_NODE_VERSION:-latest}"
IMAGE_NAME="${DOCKER_REGISTRY}/morpheus-marketplace:${IMAGE_TAG}"

# Deploy Consumer Node
echo "Deploying Consumer Node version: ${IMAGE_TAG}..."
gcloud run deploy consumer-node \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port=8082 \
  --set-env-vars "\
PROXY_ADDRESS=0.0.0.0:3333,\
WEB_ADDRESS=0.0.0.0:8082,\
WALLET_PRIVATE_KEY=${WALLET_PRIVATE_KEY},\
DIAMOND_CONTRACT_ADDRESS=${DIAMOND_CONTRACT_ADDRESS},\
MOR_TOKEN_ADDRESS=${MOR_TOKEN_ADDRESS},\
EXPLORER_API_URL=${EXPLORER_API_URL},\
ETH_NODE_CHAIN_ID=${ETH_NODE_CHAIN_ID},\
ENVIRONMENT=${ENVIRONMENT},\
PROXY_ADDRESS=${PROXY_ADDRESS},\
WEB_ADDRESS=${WEB_ADDRESS},\
WEB_PUBLIC_URL=http://consumer-service:9000,\
ETH_NODE_USE_SUBSCRIPTIONS=${ETH_NODE_USE_SUBSCRIPTIONS},\
ETH_NODE_ADDRESS=${ETH_NODE_ADDRESS},\
ETH_NODE_LEGACY_TX=${ETH_NODE_LEGACY_TX},\
PROXY_STORE_CHAT_CONTEXT=${PROXY_STORE_CHAT_CONTEXT},\
PROXY_STORAGE_PATH=${PROXY_STORAGE_PATH},\
LOG_COLOR=${LOG_COLOR},\
LOG_LEVEL=${LOG_LEVEL:-info},\
LOG_FORMAT=${LOG_FORMAT:-text},\
PROVIDER_CACHE_TTL=${PROVIDER_CACHE_TTL:-60},\
MAX_CONCURRENT_SESSIONS=${MAX_CONCURRENT_SESSIONS:-100},\
SESSION_TIMEOUT=${SESSION_TIMEOUT:-3600},\
PROXY_URL=${NFA_PROXY_URL}/v1"

check_deployment "consumer-node"

# Output the service URL and save for parent script
CONSUMER_URL=$(gcloud run services describe consumer-node --format 'value(status.url)' --region $REGION)
export CONSUMER_URL

# Update marketplace URLs
gcloud run services update nfa-proxy \
    --region $REGION \
    --update-env-vars "MARKETPLACE_BASE_URL=${CONSUMER_URL},MARKETPLACE_URL=${CONSUMER_URL}/v1/chat/completions"

# Update config.sh with the correct CONSUMER_URL using a .bak backup
sed -i.bak "s|^export CONSUMER_URL=.*|export CONSUMER_URL=\"${CONSUMER_URL}\"|" "${SCRIPT_DIR}/config.sh" && rm -f "${SCRIPT_DIR}/config.sh.bak"

echo "Consumer URL: ${CONSUMER_URL}"

echo "Updating consumer-node with WEB_PUBLIC_URL=${CONSUMER_URL}..."
gcloud run services update consumer-node \
    --region $REGION \
    --update-env-vars "WEB_PUBLIC_URL=${CONSUMER_URL}"

echo "Checking consumer-node health via ${CONSUMER_URL}/healthcheck endpoint..."
if ! check_service_health "${CONSUMER_URL}/healthcheck"; then
    echo "Consumer node health check failed"
    exit 1
fi