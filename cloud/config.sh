#!/bin/bash

# GCP Project Configuration
export PROJECT_ID="vireo-401203"
export REGION="us-central1"
export ZONE="us-central1-a"
export OPENAI_API_URL="http://34.127.54.11:8080/v1"

# Function to ensure correct GCP context
ensure_gcp_context() {
    echo "Setting GCP context..."
    gcloud config set project $PROJECT_ID
    gcloud config set compute/region $REGION
    gcloud config set compute/zone $ZONE
}
