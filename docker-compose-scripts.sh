#!/usr/bin/env bash

build_images() #@ USAGE: build_images PROD
{
  prod_dev=$1

  if [[ $prod_dev = "prod" ]];
  then
    docker build -f apps/azure-storage/Dockerfile-prod -t azure-storage .
    docker build -f apps/video-streaming/Dockerfile-prod -t video-streaming .
    docker build -f apps/history/Dockerfile-prod -t history .
  else
    docker build -f apps/azure-storage/Dockerfile-dev -t azure-storage .
    docker build -f apps/video-streaming/Dockerfile-dev -t video-streaming .
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
