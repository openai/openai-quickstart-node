#!/bin/bash

# GCP Project Configuration
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export ZONE="us-central1-a"
export DOCKER_REGISTRY="srt0422"  # Using Docker Hub registry instead of GCR

# Service Configuration
export NFA_PROXY_PORT="8080"
export CONSUMER_PORT="3333"
export WEBAPP_PORT="3000"

# API Configuration
export OPENAI_API_URL="" # Will be auto-populated during deployment with consumer node URL
export NFA_PROXY_URL="" # Will be auto-populated during deployment with proxy URL
export CONSUMER_URL="" # Will be auto-populated during deployment with consumer URL

# Model Configuration
export MODEL_PATH="/path/to/model"
export MODEL_TYPE="llama2"

# Contract Configuration
export DIAMOND_CONTRACT_ADDRESS="0xb8C55cD613af947E73E262F0d3C54b7211Af16CF"
export WALLET_PRIVATE_KEY="your-wallet-private-key"

# Function to ensure correct GCP context
ensure_gcp_context() {
    echo "Setting GCP context..."
    gcloud config set project $PROJECT_ID
    gcloud config set compute/region $REGION
    gcloud config set compute/zone $ZONE
}

# Function to check deployment status
check_deployment() {
    local service_name=$1
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        status=$(gcloud run services describe $service_name \
            --format='value(status.conditions[0].status)' 2>/dev/null || echo "Unknown")
        
        if [ "$status" == "True" ]; then
            return 0
        fi
        
        echo "Waiting for $service_name deployment... ($attempt/$max_attempts)"
        sleep 10
        ((attempt++))
    done
    
    return 1
}
