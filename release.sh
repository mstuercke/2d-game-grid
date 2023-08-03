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

  echo "Adding tag '$local_version' to commit"
  git config --global user.name "${GITLAB_USER_NAME}"
  git config --global user.email "${GITLAB_USER_EMAIL}"
  git tag "$local_version"
  git push --tags http://root:$ACCESS_TOKEN@$CI_SERVER_HOST/$CI_PROJECT_PATH.git
else
  echo "Version didn't change. Nothing to release (version: $local_version)"
fi
