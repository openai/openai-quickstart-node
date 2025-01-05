#!/bin/bash

set -e

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Set image tag based on version if specified
IMAGE_TAG="${NFA_PROXY_VERSION:-latest}"
IMAGE_NAME="${DOCKER_REGISTRY}/openai-morpheus-proxy:${IMAGE_TAG}"

# Deploy NFA Proxy
echo "Deploying NFA Proxy version: ${IMAGE_TAG}..."
gcloud run deploy nfa-proxy \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "INTERNAL_API_PORT=8080,\
MARKETPLACE_PORT=3333,\
MARKETPLACE_BASE_URL=${MARKETPLACE_BASE_URL},\
MARKETPLACE_URL=${MARKETPLACE_BASE_URL}/v1/chat/completions,\
SESSION_DURATION=1h"

check_deployment "nfa-proxy"

# Get service URL and export to environment
NFA_PROXY_URL=$(gcloud run services describe nfa-proxy \
  --region $REGION \
  --format 'value(status.url)')
export NFA_PROXY_URL

# Save NFA_PROXY_URL to temporary file for other scripts
echo "export NFA_PROXY_URL='${NFA_PROXY_URL}'" > "$(dirname "$0")/.env.tmp"

# Check service health
echo "Checking NFA Proxy health..."
if ! check_service_health "${NFA_PROXY_URL}/health"; then
    echo "Failed to verify NFA Proxy health"
    exit 1
fi

echo "NFA Proxy URL: ${NFA_PROXY_URL}"

# Update config.sh with the correct OPENAI_API_URL using a .bak backup
sed -i.bak "s|^export OPENAI_API_URL=.*|export OPENAI_API_URL=\"${NFA_PROXY_URL}\"|" "$(dirname "$0")/config.sh" && rm -f "$(dirname "$0")/config.sh.bak"
