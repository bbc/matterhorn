#!/usr/bin/env bash

# Terminate any running matterhorn containers
echo "Removing the matterhorn container"
docker rm -f matterhorn > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "No matterhorn container found, doing nothing..."
fi

# Remove the matterhorn image
echo "Removing the matterhorn image"
docker rmi matterhorn -f > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "No matterhorn image found, doing nothing"
fi
