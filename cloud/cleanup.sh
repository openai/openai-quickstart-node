#!/bin/bash

source "$(dirname "$0")/config.sh"
ensure_gcp_context

# Delete all services
echo "Cleaning up deployed services..."

services=("nfa-proxy" "consumer-node" "chat-app")

for service in "${services[@]}"; do
    echo "Deleting $service..."
    gcloud run services delete $service \
        --platform managed \
        --region $REGION \
        --quiet || true
done

echo "Cleanup complete!"
