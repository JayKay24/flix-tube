#!/usr/bin/env bash

image_name=$1
dockerfile=$2
current_platform=$3

if [[ -n $current_platform ]];
then
  docker buildx build -t $CONTAINER_REGISTRY/$image_name:$VERSION --file $dockerfile .
else
  docker buildx build -t $CONTAINER_REGISTRY/$image_name:$VERSION --file $dockerfile --platform linux/amd64 .
fi
