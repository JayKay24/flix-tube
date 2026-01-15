#!/usr/bin/env bash

prod=$1

if [[ -n $prod ]];
then
  docker compose -f docker-compose-prod.yml up --build
else
  docker compose up --build
fi
