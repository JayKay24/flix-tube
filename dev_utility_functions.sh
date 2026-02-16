#!/usr/bin/env bash

# utility functions to speed up common command-line tasks

build_azure_storage_image() #@ USAGE: build_azure_storage_image prod 1 amd
{
  prod_dev_deps=$1
  tag=$2
  amd=$3

  if [[ $prod_dev_deps = "prod" ]] && [[ -n $tag ]];
  then
    if [[ $amd = "amd" ]];
    then
      docker build -f apps/azure-storage/Dockerfile-prod --platform linux/amd64 -t "azure-storage:${tag:-latest}" .
    else
      docker build -f apps/azure-storage/Dockerfile-prod -t "azure-storage:${tag:-latest}" .
    fi
  else
    docker build -f apps/azure-storage/Dockerfile-dev -t azure-storage .
  fi
}

build_video_streaming_image() #@ USAGE: build_video_streaming_image prod 1 amd
{
  prod_dev_deps=$1
  tag=$2
  amd=$3

  if [[ $prod_dev_deps = "prod" ]] && [[ -n $tag ]];
  then
    if [[ $amd = "amd" ]];
    then
      docker build -f apps/video-streaming/Dockerfile-prod --platform linux/amd64 -t "video-streaming:${tag:-latest}" .
    else
      docker build -f apps/video-streaming/Dockerfile-prod -t "video-streaming:${tag:-latest}" .
    fi
  else
    docker build -f apps/video-streaming/Dockerfile-dev -t video-streaming .
  fi
}

build_history_image() #@ USAGE: build_history_image prod 1 amd
{
  prod_dev_deps=$1
  tag=$2
  amd=$3

  if [[ $prod_dev_deps = "prod" ]] && [[ -n $tag ]];
  then
    if [[ $amd = "amd" ]];
    then
      docker build -f apps/history/Dockerfile-prod --platform linux/amd64 -t "history:${tag:-latest}" .
    else
      docker build -f apps/history/Dockerfile-prod -t "history:${tag:-latest}" .
    fi
  else
    docker build -f apps/history/Dockerfile-dev -t history .
  fi
}

build_metadata_image() #@ USAGE: build_metadata_image prod 1 amd
{
  prod_dev_deps=$1
  tag=$2
  amd=$3

  if [[ $prod_dev_deps = "prod" ]] && [[ -n $tag ]];
  then
    if [[ $amd = "amd" ]];
    then
      docker build -f apps/metadata/Dockerfile-prod --platform linux/amd64 -t "metadata:${tag:-latest}" .
    else
      docker build -f apps/metadata/Dockerfile-prod -t "metadata:${tag:-latest}" .
    fi
  else
    docker build -f apps/metadata/Dockerfile-dev -t metadata .
  fi
}

build_images() #@ USAGE: build_images prod 1 amd
{
  prod_dev_deps=$1
  tag=$2
  amd=$3

  if [[ $prod_dev_deps = "prod" ]] && [[ -n $tag ]];
  then
    if [[ $amd = "amd" ]];
    then
      build_azure_storage_image $prod_dev_deps $tag $amd
      build_video_streaming_image $prod_dev_deps $tag $amd
      build_history_image $prod_dev_deps $tag $amd
      build_metadata_image $prod_dev_deps $tag $amd
    else
      build_azure_storage_image $prod_dev_deps $tag
      build_video_streaming_image $prod_dev_deps $tag
      build_history_image $prod_dev_deps $tag
      build_metadata_image $prod_dev_deps $tag
    fi
  else
    build_azure_storage_image $prod_dev_deps
    build_video_streaming_image $prod_dev_deps
    build_history_image $prod_dev_deps
    build_metadata_image $prod_dev_deps
  fi
}

up() #@ USAGE: up PROD video-streaming
{
  prod=$1
  service=$2

  if [[ -n $prod ]] && [[ -n $service ]];
  then
    docker compose -f "docker-compose-${service}-${prod}.yml" up --build --detach
  else
    if [[ $prod = "prod" ]];
    then
      docker compose -f docker-compose-all-prod.yml up --build --detach
    elif [[ $prod = "dev" ]];
    then
      docker compose -f docker-compose-all-dev.yml up --build --detach
    else
      docker compose -f docker-compose-infra.yml up --build --detach
    fi
  fi
}

down() #@ USAGE: down PROD video-streaming
{
  prod=$1
  service=$2

  if [[ -n $prod ]] && [[ -n $service ]];
  then
    docker compose -f "docker-compose-${service}-${prod}.yml" down --volumes
  else
    if [[ $prod = "prod" ]];
    then
      docker compose -f docker-compose-all-prod.yml down --volumes
    elif [[ $prod = "dev" ]];
    then
      docker compose -f docker-compose-all-dev.yml down --volumes
    else
      docker compose -f docker-compose-infra.yml down --volumes
    fi
  fi
}

reboot() #@ USAGE: reboot PROD video-streaming
{
  prod_dev=$1
  service=$2

  if [[ -n $prod_dev ]] && [[ -n $service ]];
  then
    down $prod_dev $service
    up $prod_dev $service
  else
    down $prod_dev
    up $prod_dev
  fi  
}

load_env() #@ USAGE: load_env file
{
  file_name=$1
  set -a
  if [[ -f $file_name ]];
  then
    source $file_name
  fi
  set +a
}

load_all_env() #@ USAGE: load_all_env
{
  files_list=()
  files_list+=(common.env)
  files_list+=(db-fixtures-rest-api.env)
  files_list+=(gateway.env)
  files_list+=(history.env)
  files_list+=(metadata.env)
  files_list+=(test.env)
  files_list+=(video-storage.env)
  files_list+=(video-streaming.env)
  files_list+=(video-upload.env)
  for file_name in $files_list; do
    load_env $file_name
  done
}
