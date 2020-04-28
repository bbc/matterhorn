set -e

# if we're running in CodeBuild we don't use the wormhole
if [ -z "$CODEBUILD_BUILD_ID" ]; then
  echo "fetching credentials for local usage"

  curl \
    --silent \
    --cert $CLIENT_CERT \
    --key $CLIENT_KEY \
    "https://wormhole.api.bbci.co.uk/account/119990297419/credentials" \
    -o credentials.json

  export AWS_ACCESS_KEY_ID=$(cat credentials.json | jq -r .accessKeyId)
  export AWS_SECRET_ACCESS_KEY=$(cat credentials.json | jq -r .secretAccessKey)
  export AWS_SESSION_TOKEN=$(cat credentials.json | jq -r .sessionToken)
  export AWS_REGION=eu-west-1
fi

export ENVIRONMENT=local

npm run lint:src
npm run lint:test
npm run test:spec
npm run test:integration
