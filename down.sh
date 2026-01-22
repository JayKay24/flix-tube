#!/usr/bin/env bash

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