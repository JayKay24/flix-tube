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
    else
      build_azure_storage_image $prod_dev_deps $tag
      build_video_streaming_image $prod_dev_deps $tag
      build_history_image $prod_dev_deps $tag
    fi
  else
    build_azure_storage_image $prod_dev_deps
    build_video_streaming_image $prod_dev_deps
    build_history_image $prod_dev_deps
  fi
}

up() #@ USAGE: up PROD
{
  prod=$1

  if [[ $prod = "prod" ]];
  then
    docker compose -f docker-compose-prod.yml up --build --detach
  elif [[ $prod = "dev" ]];
  then
    docker compose -f docker-compose-dev.yml up --build --detach
  else
    docker compose -f docker-compose-deps.yml up --build --detach
  fi
}

down() #@ USAGE: down PROD
{
  prod=$1

  if [[ $prod = "prod" ]];
  then
    docker compose -f docker-compose-prod.yml down --volumes
  elif [[ $prod = "dev" ]];
  then
    docker compose -f docker-compose-dev.yml down --volumes
  else
    docker compose -f docker-compose-deps.yml down --volumes
  fi
}

reboot() #@ USAGE: reboot PROD
{
  prod_dev=$1

  down $prod_dev
  up $prod_dev
}
