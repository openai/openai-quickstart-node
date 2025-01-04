#!/bin/bash

set -e

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Build and deploy Consumer Node
IMAGE_NAME="${DOCKER_REGISTRY}/consumer-node"

echo "Building Consumer Node..."
gcloud builds submit ./consumer --tag $IMAGE_NAME

echo "Deploying Consumer Node..."
gcloud run deploy consumer-node \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars "PORT=${CONSUMER_PORT},\
    PROXY_URL=${NFA_PROXY_URL},\
    DIAMOND_CONTRACT_ADDRESS=${DIAMOND_CONTRACT_ADDRESS},\
    WALLET_PRIVATE_KEY=${WALLET_PRIVATE_KEY}" \
    --project $PROJECT_ID

check_deployment "consumer-node"
