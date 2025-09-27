#!/bin/bash

# Build script for macOS/Linux
set -e

# Change to project root directory
cd "$(dirname "$0")/.."

echo "🔨 Building Blindspotter Docker image..."

# Build the Docker image
docker build -f Dockerfile -t blindspotter .

echo "✅ Build completed successfully!"
echo "📋 To run the container: ./bin/run.sh"
