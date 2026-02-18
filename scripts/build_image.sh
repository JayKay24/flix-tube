#!/usr/bin/env bash

image_name=$1
dockerfile=$2

docker build -t $CONTAINER_REGISTRY/$image_name:$VERSION --file $dockerfile --platform linux/amd64 .
