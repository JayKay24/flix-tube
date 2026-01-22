#!/usr/bin/env bash

prod=$1

if [[ -n $prod ]];
then
  docker build -f apps/azure-storage/Dockerfile-prod -t azure-storage .
  docker build -f apps/video-streaming/Dockerfile-prod -t video-streaming .
  docker build -f apps/history/Dockerfile-prod -t history .
else
  docker build -f apps/azure-storage/Dockerfile-dev -t azure-storage .
  docker build -f apps/video-streaming/Dockerfile-dev -t video-streaming .
  docker build -f apps/history/Dockerfile-dev -t history .
fi
