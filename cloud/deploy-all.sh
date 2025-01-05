#!/bin/bash

set -e

SCRIPT_DIR="$(dirname "$0")"
source "${SCRIPT_DIR}/config.sh"

# Deploy NFA Proxy and load its environment
echo "=== Deploying NFA Proxy ==="
source "${SCRIPT_DIR}/deploy-proxy.sh"

if [ -z "$NFA_PROXY_URL" ]; then
    echo "Error: NFA Proxy URL not set after deployment"
    exit 1
fi

# Deploy Consumer Node
echo "=== Deploying Consumer Node ==="
source "${SCRIPT_DIR}/deploy-consumer.sh"
export CONSUMER_URL

# Update NFA Proxy configuration with consumer URL
echo "=== Updating NFA Proxy configuration ==="
gcloud run services update nfa-proxy \
  --platform managed \
  --region $REGION \
  --set-env-vars "MARKETPLACE_PORT=3333,\
SESSION_DURATION=1h,\
MARKETPLACE_BASE_URL=${CONSUMER_URL},\
MARKETPLACE_URL=${CONSUMER_URL}/v1/chat/completions"

# Deploy Web App
echo "=== Deploying Web App ==="
source "${SCRIPT_DIR}/deploy-webapp.sh"

echo "=== Deployment Complete ==="
echo "NFA Proxy: ${NFA_PROXY_URL}"
echo "Consumer: ${CONSUMER_URL}"
echo "Web App: ${WEBAPP_URL}"