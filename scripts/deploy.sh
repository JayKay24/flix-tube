#!/usr/bin/env bash

deployment_file=$1
envsubst < $deployment_file | kubectl apply -f -
