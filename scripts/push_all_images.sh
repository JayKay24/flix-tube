#!/usr/bin/env bash

echo $REGISTRY_PW | \
  docker login $CONTAINER_REGISTRY --username $REGISTRY_UN --password-stdin

docker_images=()
docker_images+=("azure-storage")
docker_images+=("gateway")
docker_images+=("history")
docker_images+=("metadata")
docker_images+=("video-streaming")
docker_images+=("video-upload")

for docker_image in ${docker_images[@]}; do
  docker push $CONTAINER_REGISTRY/$docker_image:$VERSION
done