#!/usr/bin/env bash

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
