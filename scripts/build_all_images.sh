#!/usr/bin/env bash

declare -A docker_images

docker_images["azure-storage"]="apps/azure-storage/Dockerfile-prod"
docker_images["gateway"]="apps/gateway/Dockerfile-prod"
docker_images["history"]="apps/history/Dockerfile-prod"
docker_images["metadata"]="apps/metadata/Dockerfile-prod"
docker_images["video-streaming"]="apps/video-streaming/Dockerfile-prod"
docker_images["video-upload"]="apps/video-upload/Dockerfile-prod"
docker_images["db-fixture-rest-api"]="apps/db-fixture-rest-api/Dockerfile-prod"

for item in "${!docker_images[@]}"; do
  image_name=$item
  dockerfile=${docker_images[${item}]}
  docker buildx build -t $CONTAINER_REGISTRY/$image_name:$VERSION --file $dockerfile --platform linux/amd64 .
done