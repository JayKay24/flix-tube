#!/usr/bin/env bash

docker_images=()
docker_images+=(azure-storage)
docker_images+=(gateway)
docker_images+=(history)
docker_images+=(metadata)
docker_images+=(video-streaming)
docker_images+=(video-upload)

for docker_image in ${docker_images[@]}; do
  ./push_image.sh $docker_image
done