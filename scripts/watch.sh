set -e

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

ENVIRONMENT=local nodemon server
