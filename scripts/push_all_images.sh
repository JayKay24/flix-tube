#!/usr/bin/env bash

cluster_env=$1
images_json_file=${2:-scripts/docker_images.json}

if [[ -z "$cluster_env" ]]; then
  echo "Usage: $0 <cluster_env> [images_json_file]"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "Error: jq is required but not installed."
  exit 1
fi

if [[ ! -f "$images_json_file" ]]; then
  echo "Error: JSON file not found: $images_json_file"
  exit 1
fi

if ! jq -e 'type == "object" and all(values[]; type == "string")' "$images_json_file" >/dev/null 2>&1; then
  echo "Error: $images_json_file must be a JSON object of string keys to string values."
  exit 1
fi

echo $REGISTRY_PW | \
  docker login $CONTAINER_REGISTRY --username $REGISTRY_UN --password-stdin


mapfile -t docker_images < <(jq -r 'keys[]' "$images_json_file")

for docker_image in ${docker_images[@]}; do
  docker push $CONTAINER_REGISTRY/$cluster_env-$docker_image:$VERSION
done
