#!/usr/bin/env bash

image_name=$1
cluster_env=$2

echo $REGISTRY_PW | \
  docker login $CONTAINER_REGISTRY --username $REGISTRY_UN --password-stdin

docker push $CONTAINER_REGISTRY/$cluster_env-$image_name:$VERSION
