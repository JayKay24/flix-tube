#!/usr/bin/env bash

current_platform=$1
cluster_env=$2

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
  if [[ $current_platform == "linux/amd64" ]];
  then
    docker buildx build -t $CONTAINER_REGISTRY/$cluster_env-$image_name:$VERSION --file $dockerfile --platform linux/amd64 .
  else
    docker buildx build -t $CONTAINER_REGISTRY/$cluster_env-$image_name:$VERSION --file $dockerfile .
  fi
done
