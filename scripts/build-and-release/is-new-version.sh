#!/usr/bin/env bash

cosmos releases matterhorn | grep $(node -e 'console.log(require("./package.json").version)') > /dev/null

if [ $? -eq 0 ]; then
  echo "NO"
else
  echo "YES"
fi
