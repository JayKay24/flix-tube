#!/usr/bin/env bash

# update this script after upgrading to bash 5
docker_images=(
  "azure-storage:apps/azure-storage/Dockerfile-prod"
  "gateway:apps/gateway/Dockerfile-prod"
  "history:apps/history/Dockerfile-prod"
  "metadata:apps/metadata/Dockerfile-prod"
  "video-streaming:apps/video-streaming/Dockerfile-prod"
  "video-upload:apps/video-upload/Dockerfile-prod"
  "db-fixture-rest-api:apps/db-fixture-rest-api/Dockerfile-prod"
)

for item in "${docker_images[@]}"; do
  image_name="${item%%:*}"
  dockerfile="${item#*:}"
  docker buildx build -t $CONTAINER_REGISTRY/$image_name:$VERSION --file $dockerfile --platform linux/amd64 .
done