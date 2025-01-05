#!/bin/bash

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Build and push the container
echo "Building and pushing container..."
IMAGE_NAME="gcr.io/$PROJECT_ID/chat-web-app"
gcloud builds submit --tag $IMAGE_NAME

# Deploy to Cloud Run
echo "Deploying Chat Web App to Cloud Run..."
gcloud run deploy chat-web-app \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars "OPENAI_API_URL=${OPENAI_API_URL}/v1" \
  --project $PROJECT_ID

# Get the deployed URL
SERVICE_URL=$(gcloud run services describe chat-web-app \
  --platform managed \
  --region $REGION \
  --format 'value(status.url)')

echo "Deployment complete. Application URL: $SERVICE_URL"
