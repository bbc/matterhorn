#!/usr/bin/env bash
set -e

cosmos releases matterhorn | grep $(node -e 'console.log(require("./package.json").version)')
