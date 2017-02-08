#!/usr/bin/env bash
set -e

npm install
npm run cosmos:deploy -- $1 $2
