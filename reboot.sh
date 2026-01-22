#!/usr/bin/env bash

prod_dev=$1
if [[ -n $prod_dev ]];
then
  ./down.sh $prod_dev
  ./up.sh $prod_dev
else
  ./down.sh
  ./up.sh
fi
