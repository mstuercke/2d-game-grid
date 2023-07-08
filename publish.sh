#!/bin/bash

set -e

name=$(npm pkg get name | tr -d \")
published_version=$(npm view "$name" version | tr -d \")
local_version=$(npm pkg get version | tr -d \")

if [ "$name" = "" ] || [ "$published_version" = "" ] || [ "$local_version" = "" ]; then
  echo "Unable to retrieve package name or versions"
  exit 1
fi

if [ "$local_version" != "$published_version" ]; then
  echo "Publishing new version $local_version"
  npm config set //registry.npmjs.org/:_authToken "$NPM_TOKEN"
  npm publish
else
  echo "Version didn't change. Nothing to publish (version: $local_version)"
fi
