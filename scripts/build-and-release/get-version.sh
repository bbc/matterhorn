#!/usr/bin/env bash

VERSION=$(node -e 'console.log(require("./package.json").version)')
echo $VERSION
