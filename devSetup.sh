#!/usr/bin/env bash

# Change directory to the location of this script
# This is to ensure we can execute relative scripts
PARENT_PATH=$(cd "$(dirname "${BASH_SOURCE}")" ; pwd -P)
cd $PARENT_PATH

COSMOS_SANDBOX_PATH=$HOME/workspace/cosmos-sandbox-docker
COSMOS_AUTHED_SANDBOX_PATH=$HOME/workspace/cosmos-sandbox-docker-gh-auth

# Terminate any running matterhorn containers
echo "Attempting to remove matterhorn container"
docker rm -f matterhorn > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "No matterhorn container found, doing nothing..."
fi

# Clone cosmos-sandbox-docker if it doesn't already exist
if [ ! -d "$COSMOS_SANDBOX_PATH" ]; then
    git clone git@github.com:bbc/cosmos-sandbox-docker.git $COSMOS_SANDBOX_PATH
fi

# Build a CentOS 7 image with Cosmos things if we don't have one
docker inspect bbc_cosmos/sandbox-el7 > /dev/null 2>&1
if [ $? -ne 0 ]; then
    pushd $COSMOS_SANDBOX_PATH
    sh build.sh el7
    popd
fi

# Clone cosmos-sandbox-docker-gh-auth if it doesn't already exist
if [ ! -d "$COSMOS_AUTHED_SANDBOX_PATH" ]; then
    git clone git@github.com:bbc/cosmos-sandbox-docker-gh-auth.git $COSMOS_AUTHED_SANDBOX_PATH
fi

# Build a CentOS 7 image with Cosmos things if we don't have one
docker inspect bbc_cosmos/sandbox-el7-authed > /dev/null 2>&1
if [ $? -ne 0 ]; then
    pushd $COSMOS_AUTHED_SANDBOX_PATH
    ./build.sh
    if [[ $? -ne 0 ]] ; then
        exit 1
    fi
    popd
fi

# Build our Docker image and bring up the container in the background
docker-compose build

echo "Finished building docker container"

ENVIRONMENT=sandbox docker-compose up -d &&

echo "Container is booting up; use 'docker-compose logs --follow' to monitor final setup"
