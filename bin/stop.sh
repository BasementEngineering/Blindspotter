#!/bin/bash

# Stop script for macOS/Linux
set -e

CONTAINER_NAME="blindspotter-app"

echo "⏹️  Stopping Blindspotter container..."

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
    echo "✅ Container stopped successfully!"
else
    echo "ℹ️  No running container found with name: $CONTAINER_NAME"
fi

if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    docker rm $CONTAINER_NAME
    echo "🗑️  Container removed successfully!"
fi