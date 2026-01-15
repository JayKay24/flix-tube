#!/usr/bin/env bash

prod=$1
if [[ -n $prod ]];
then
  ./down.sh $prod
  ./up.sh $prod
else
  ./down.sh
  ./up.sh
fi
