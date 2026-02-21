#!/usr/bin/env bash

image_name=$1
dockerfile=$2
current_platform=$3
cluster_env=$4

if [[ $current_platform == "linux/amd64" ]];
then
  docker buildx build -t $CONTAINER_REGISTRY/$cluster_env-image_name:$VERSION --file $dockerfile --platform linux/amd64 .
else
  docker buildx build -t $CONTAINER_REGISTRY/$cluster_env-image_name:$VERSION --file $dockerfile .
fi
