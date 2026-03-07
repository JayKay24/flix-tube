#!/usr/bin/env bash

current_platform=$1
cluster_env=$2
images_json_file=${3:-scripts/docker_images.json}

if [[ -z "$current_platform" || -z "$cluster_env" ]]; then
  echo "Usage: $0 <platform> <cluster_env> [images_json_file]"
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

declare -A docker_images

while IFS=$'\t' read -r image_name dockerfile; do
  docker_images["$image_name"]="$dockerfile"
done < <(jq -r 'to_entries[] | [.key, .value] | @tsv' "$images_json_file")

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
