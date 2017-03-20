#!/usr/bin/env bash
set -e

VERSION_ALREADY_EXISTS=$(cosmos releases matterhorn | grep $(node -e 'console.log(require("./package.json").version)'))

if [ $VERSION_ALREADY_EXISTS ]; then
  echo "NO"
else
  echo "YES"
fi
