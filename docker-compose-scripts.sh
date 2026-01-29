#!/usr/bin/env bash

build_azure_storage_image() #@ USAGE: build_azure_storage_image PROD
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

build_video_streaming_image() #@ USAGE: build_video_streaming_image PROD
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

build_history_image() #@ USAGE: build_history_image PROD
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

up() #@ USAGE: up PROD
{
  prod=$1

  if [[ $prod = "prod" ]];
  then
    docker compose -f docker-compose-prod.yml up --build
  elif [[ $prod = "dev" ]];
  then
    docker compose -f docker-compose-dev.yml up --build
  else
    docker compose -f docker-compose-deps.yml up --build
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
