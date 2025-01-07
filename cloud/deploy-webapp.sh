#!/bin/bash

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Define version
VERSION="${VERSION:-latest}"

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Build and push containers
echo "Building and pushing containers..."
IMAGE_NAME="gcr.io/$PROJECT_ID/chat-web-app:$VERSION"
DOCKER_HUB_IMAGE="$DOCKER_REGISTRY/chat-web-app:$VERSION"

# Build and push to Docker Hub first
docker build -t "$DOCKER_HUB_IMAGE" .
docker push "$DOCKER_HUB_IMAGE"

# Deploy to Cloud Run
echo "Deploying Chat Web App to Cloud Run..."
if gcloud run deploy chat-web-app \
  --image "$DOCKER_HUB_IMAGE" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --set-env-vars "OPENAI_API_URL=${OPENAI_API_URL}/v1" \
  --project "$PROJECT_ID"; then
  echo "Docker Hub deployment succeeded."
else
  echo "Docker Hub deployment failed. Falling back to Google Cloud Registry..."
  gcloud builds submit --tag "$IMAGE_NAME"
  gcloud run deploy chat-web-app \
    --image "$IMAGE_NAME" \
    --platform managed \
    --region "$REGION" \
    --allow-unauthenticated \
    --set-env-vars "OPENAI_API_URL=${OPENAI_API_URL}/v1" \
    --project "$PROJECT_ID"
fi

# Get the deployed URL
SERVICE_URL=$(gcloud run services describe chat-web-app \
  --platform managed \
  --region $REGION \
  --format 'value(status.url)')

echo "Deployment complete. Application URL: $SERVICE_URL"
