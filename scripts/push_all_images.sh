#!/usr/bin/env bash

cluster_env=$1

echo $REGISTRY_PW | \
  docker login $CONTAINER_REGISTRY --username $REGISTRY_UN --password-stdin

docker_images=()
docker_images+=("azure-storage")
docker_images+=("gateway")
docker_images+=("history")
docker_images+=("metadata")
docker_images+=("video-streaming")
docker_images+=("video-upload")
docker_images+=("db-fixture-rest-api")

for docker_image in ${docker_images[@]}; do
  docker push $CONTAINER_REGISTRY/$cluster_env-$docker_image:$VERSION
done