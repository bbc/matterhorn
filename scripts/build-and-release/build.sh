#!/usr/bin/env bash
set -e

LATEST_TAG=`node -e "console.log(require('./package.json').version)"`
LATEST_TAG_COMMIT=$(git rev-parse --verify v$LATEST_TAG^{commit})

npm install
npm test

if [ "$LATEST_TAG_COMMIT" == "$GIT_COMMIT" ]; then
  BUILD_OUTPUT=$(npm run release 2>&1)
  if [ $? -ne 0 ]; then
    echo "$COSMOS_BUILD_OUTPUT"
    if [[ $COSMOS_BUILD_OUTPUT == *"repository cosmos-taf-service-matterhorn already contains"* ]]; then
      exit 0
    else
      exit 1
    fi
  fi
fi
