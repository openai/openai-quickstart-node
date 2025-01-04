#!/bin/bash

set -e

# Source configuration
source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Deploy NFA Proxy
echo "Deploying NFA Proxy..."
"$(dirname "$0")/deploy-proxy.sh"

# Wait for proxy to be ready
sleep 30

# Deploy Consumer Node
echo "Deploying Consumer Node..."
"$(dirname "$0")/deploy-consumer.sh"

# Wait for consumer to be ready
sleep 30

# Deploy Web App
echo "Deploying Chat Web App..."
"$(dirname "$0")/deploy-webapp.sh"

echo "Deployment complete! Service URLs:"
echo "NFA Proxy: $(gcloud run services describe nfa-proxy --format 'value(status.url)')"
echo "Consumer: $(gcloud run services describe consumer-node --format 'value(status.url)')"
echo "Web App: $(gcloud run services describe chat-app --format 'value(status.url)')"
