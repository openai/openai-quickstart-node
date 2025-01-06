#!/bin/bash

# GCP Project Configuration
export PROJECT_ID="vireo-401203"
export REGION="us-central1"
export ZONE="us-central1-a"
export DOCKER_REGISTRY="srt0422"  # Using Docker Hub registry instead of GCR

# API Configuration
export OPENAI_API_URL="https://nfa-proxy-yalzemm5uq-uc.a.run.app"
export CONSUMER_URL="https://consumer-node-yalzemm5uq-uc.a.run.app"

# Contract Configuration
export DIAMOND_CONTRACT_ADDRESS="0xb8C55cD613af947E73E262F0d3C54b7211Af16CF"
export WALLET_PRIVATE_KEY="fdd1558ae357009d8ed9e14230ea5bb4f4114efbe1780505bd19a9a0747bc6d7"

# Service Configuration 
export INTERNAL_API_PORT="8080"  # Internal reference only, Cloud Run will provide PORT
export MARKETPLACE_PORT="3333"
export SESSION_DURATION="1h"

# API Configuration
export MARKETPLACE_BASE_URL="" # Will be auto-populated during deployment
export MARKETPLACE_URL="" # Will be auto-populated during deployment
export NFA_PROXY_URL="" # Will be auto-populated during deployment

# Container Versions (optional - defaults to 'latest' if not set)
export NFA_PROXY_VERSION="v0.0.18"      # e.g. "v1.0.0" - for srt0422/openai-morpheus-proxy
export CONSUMER_NODE_VERSION=""  # e.g. "v1.0.0" - for srt0422/morpheus-marketplace-consumer

# Consumer Node Configuration
export BLOCKCHAIN_WS_URL="wss://arbitrum-mainnet.infura.io/ws/v3/your-project-id"
export BLOCKCHAIN_HTTP_URL="https://arbitrum-mainnet.infura.io/v3/your-project-id"
export LOG_LEVEL="info"
export LOG_FORMAT="text"
export PROVIDER_CACHE_TTL="60"
export MAX_CONCURRENT_SESSIONS="100"
export SESSION_TIMEOUT="3600"

# Additional environment variables for Consumer Node (from consumer-deployment.yaml)
export MOR_TOKEN_ADDRESS="0x34a285a1b1c166420df5b6630132542923b5b27e"
export EXPLORER_API_URL="https://api-sepolia.arbiscan.io/api"
export ETH_NODE_CHAIN_ID="421614"
export ENVIRONMENT="development"
export PROXY_ADDRESS="0.0.0.0:3334"
export WEB_ADDRESS="0.0.0.0:8083"
export WEB_PUBLIC_URL="https://consumer-node-yalzemm5uq-uc.a.run.app"
export ETH_NODE_USE_SUBSCRIPTIONS="false"
export ETH_NODE_ADDRESS="https://sepolia-rollup.arbitrum.io/rpc"
export ETH_NODE_LEGACY_TX="false"
export PROXY_STORE_CHAT_CONTEXT="true"
export PROXY_STORAGE_PATH="./data/"
export LOG_COLOR="true"

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
            --region $REGION \
            --format='value(status.conditions[0].status)' 2>/dev/null || echo "Unknown")
        echo "Service $service_name status: $status"
        if [ "$status" == "True" ]; then
            return 0
        fi
        
        echo "Waiting for $service_name deployment... ($attempt/$max_attempts)"
        sleep 10
        ((attempt++))
    done
    
    return 1
}


# Function to check service health
check_service_health() {
    local service_url=$1
    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        echo "Checking service health (attempt $attempt/$max_attempts)..."
        if curl -s "${service_url}" | grep -iq 'healthy'; then
            echo "Service is healthy!"
            return 0
        fi
        echo "Service not healthy yet, waiting..."
        sleep 10
        ((attempt++))
    done
    
    echo "Service failed to become healthy after $max_attempts attempts"
    return 1
}
