#!/bin/bash

# Run script for macOS/Linux
set -e

CONTAINER_NAME="blindspotter-app"
PORT=${1:-3000}

echo "🚀 Starting Blindspotter container on port $PORT..."

# Stop existing container if running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "⏹️  Stopping existing container..."
    docker stop $CONTAINER_NAME
fi

# Remove existing container if exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "🗑️  Removing existing container..."
    docker rm $CONTAINER_NAME
fi

# Run new container
docker run -d --name $CONTAINER_NAME -p $PORT:3000 blindspotter

echo "✅ Container started successfully!"
echo "🌐 Open http://localhost:$PORT in your browser"
echo "📋 To stop: ./bin/stop.sh"