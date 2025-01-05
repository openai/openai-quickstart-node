# Chat Application Deployment Guide

## Overview
This repository contains deployment configurations for three interconnected services:
- NFA Proxy (Base LLM Service)
- Consumer Node
- Chat Web Application

## Prerequisites
- Google Cloud SDK installed
- Node.js >=16
- npm >=7
- Docker

## Configuration

1. Copy the example environment file:
```bash
cp cloud/config.example.sh cloud/config.sh
```

2. Edit `cloud/config.sh` with your settings:
```bash
export PROJECT_ID="your-project-id"
export REGION="us-central1"
export ZONE="us-central1-a"
export DOCKER_REGISTRY="srt0422"  # Using Docker Hub registry instead of GCR

# Service Configuration
export NFA_PROXY_PORT="8080"
export CONSUMER_PORT="3333"
export WEBAPP_PORT="3000"

# Wallet Configuration
export WALLET_PRIVATE_KEY="your-wallet-private-key"

# Contract Configuration
export DIAMOND_CONTRACT_ADDRESS="0xb8C55cD613af947E73E262F0d3C54b7211Af16CF"
```

## Docker Images
The deployment uses the following pre-built Docker Hub images:
- NFA Proxy: `srt0422/openai-morpheus-proxy:latest`
- Consumer Node: `srt0422/morpheus-marketplace:latest`

The Chat Web App is deployed directly from the source code to Google Cloud Run.

## Deployment

### Single Command Deployment
Deploy all services with:
```bash
./cloud/deploy-all.sh
```

### Individual Service Deployment
Deploy services separately:
```bash
# Deploy NFA Proxy
./cloud/deploy-proxy.sh

# Deploy Consumer Node
./cloud/deploy-consumer.sh

# Deploy Chat Web App
./cloud/deploy-webapp.sh
```

## Service Architecture

```
Chat Web App (Frontend)
       ↓
NFA Proxy (API Layer)
       ↓
Consumer Node (Morpheus Integration Layer)
```

## Environment Variables

### NFA Proxy
- `API_LISTEN_PORT`: Internal service port (default: 8080)

### Consumer Node
- `PROXY_URL`: URL of NFA Proxy service
- `PORT`: Service port (default: 3333)
- `WALLET_PRIVATE_KEY`: Your Ethereum wallet private key (required for blockchain interactions)
- `DIAMOND_CONTRACT_ADDRESS`: The deployed diamond contract address
- `BLOCKCHAIN_WS_URL`: Websocket URL for blockchain events
- `BLOCKCHAIN_HTTP_URL`: HTTP URL for blockchain transactions
- `LOG_LEVEL`: Logging level (default: info)
- `LOG_FORMAT`: Log format (text/json, default: text)
- `PROVIDER_CACHE_TTL`: Provider cache time-to-live in seconds (default: 60)
- `MAX_CONCURRENT_SESSIONS`: Maximum concurrent sessions (default: 100)
- `SESSION_TIMEOUT`: Session timeout in seconds (default: 3600)

### Chat Web App
- `OPENAI_API_URL`: URL of Consumer Node
- `PORT`: Web app port (default: 3000)

## Monitoring & Logs

View service logs:
```bash
gcloud logging tail "resource.type=cloud_run_revision"
```

## Cleanup

Remove all deployed services:
```bash
./cloud/cleanup.sh
```

