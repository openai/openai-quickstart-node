#!/bin/bash

set -e

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Define proxy and consumer images
export NFA_PROXY_IMAGE="srt0422/openai-morpheus-proxy:latest"
export CONSUMER_IMAGE="srt0422/morpheus-marketplace-consumer:latest"

# Deploy NFA Proxy
echo "Deploying NFA Proxy..."
gcloud run deploy nfa-proxy \
  --image $NFA_PROXY_IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated

# Get proxy URL
export NFA_PROXY_URL=$(gcloud run services describe nfa-proxy \
  --format 'value(status.url)')

# Deploy Consumer Node
echo "Deploying Consumer Node..."
gcloud run deploy consumer-node \
  --image $CONSUMER_IMAGE \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "PROXY_URL=${NFA_PROXY_URL},DIAMOND_CONTRACT_ADDRESS=${DIAMOND_CONTRACT_ADDRESS},WALLET_PRIVATE_KEY=${WALLET_PRIVATE_KEY}"

# Get consumer URL
export CONSUMER_URL=$(gcloud run services describe consumer-node \
  --format 'value(status.url)')

# Build and deploy Chat Web App
echo "Building and deploying Chat Web App..."
npm run build

# Deploy using local build
gcloud run deploy chat-app \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "OPENAI_API_URL=${CONSUMER_URL}"

echo "Deployment complete! Service URLs:"
echo "NFA Proxy: $(gcloud run services describe nfa-proxy --format 'value(status.url)')"
echo "Consumer: $(gcloud run services describe consumer-node --format 'value(status.url)')"
echo "Web App: $(gcloud run services describe chat-app --format 'value(status.url)')"
