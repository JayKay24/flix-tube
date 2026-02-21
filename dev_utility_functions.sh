#!/usr/bin/env bash

# utility functions to speed up common command-line tasks

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
