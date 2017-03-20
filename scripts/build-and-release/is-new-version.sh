#!/usr/bin/env bash

export COSMOS_CERT='/etc/pki/tls/private/client_crt_key.pem'

cosmos releases matterhorn | grep $(node -e 'console.log(require("./package.json").version)') > /dev/null

if [ $? -eq 0 ]; then
  echo "NO"
else
  echo "YES"
fi
