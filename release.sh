#!/bin/sh

set -e

yarn build

name=$(npm pkg get name | tr -d \")
released_version=$(npm view "$name" version | tr -d \")
local_version=$(npm pkg get version | tr -d \")

if [ "$name" = "" ] || [ "$released_version" = "" ] || [ "$local_version" = "" ]; then
  echo "Unable to retrieve package name or versions"
  exit 1
fi

if [ "$local_version" != "$released_version" ]; then
  echo "Releasing new version $local_version"
  npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
  npm publish
else
  echo "Version didn't change. Nothing to release (version: $local_version)"
fi
