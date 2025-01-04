#!/bin/bash

set -e

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Build and deploy NFA Proxy
IMAGE_NAME="${DOCKER_REGISTRY}/nfa-proxy"

echo "Building NFA Proxy..."
gcloud builds submit ./nfa-proxy --tag $IMAGE_NAME

echo "Deploying NFA Proxy..."
gcloud run deploy nfa-proxy \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --set-env-vars "MODEL_PATH=${MODEL_PATH},MODEL_TYPE=${MODEL_TYPE},PORT=${NFA_PROXY_PORT}" \
    --project $PROJECT_ID

check_deployment "nfa-proxy"
