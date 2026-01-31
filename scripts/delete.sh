#!/usr/bin/env bash

deployment_env=$1
kubectl apply -k $deployment_env --dry-run=client -o yaml | \
  envsubst | \
  kubectl delete -f -
