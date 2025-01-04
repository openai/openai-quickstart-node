#!/bin/bash

# GCP Project Configuration
export PROJECT_ID="vireo-401203"
export REGION="us-central1"
export ZONE="us-central1-a"
export OPENAI_API_URL="http://34.127.54.11:8080/v1"

# Contract Configuration
export DIAMOND_CONTRACT_ADDRESS="0xb8C55cD613af947E73E262F0d3C54b7211Af16CF"
export WALLET_PRIVATE_KEY="" # Add your private key here

# Additional Configuration
export DOCKER_REGISTRY="gcr.io/${PROJECT_ID}"
export NFA_PROXY_PORT="8080"
export CONSUMER_PORT="3333"
export WEBAPP_PORT="3000"
export MODEL_PATH="/path/to/model"
export MODEL_TYPE="llama2"

# Function to ensure correct GCP context
ensure_gcp_context() {
    echo "Setting GCP context..."
    gcloud config set project $PROJECT_ID
    gcloud config set compute/region $REGION
    gcloud config set compute/zone $ZONE
}
