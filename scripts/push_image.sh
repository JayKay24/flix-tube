#!/usr/bin/env bash

image_name=$1

echo $REGISTRY_PW | docker login $CONTAINER_REGISTRY --username $REGISTRY_UN --password-stdin

docker push $CONTAINER_REGISTRY/$image_name:$VERSION
