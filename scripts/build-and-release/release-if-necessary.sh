#!/usr/bin/env bash

export VERSION_ALREADY_EXISTS=$(cosmos releases matterhorn | grep $(node -e 'console.log(require("./package.json").version)'))

if [ ! "$VERSION_ALREADY_EXISTS" ]; then
  npm run release
fi
