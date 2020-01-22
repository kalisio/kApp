#!/bin/bash
# Define the environment variables

TEST_FLAVOR_REGEX="^test*"
PROD_FLAVOR_REGEX="^v[0-9]+\.[0-9]+\.[0-9]+"
if [[ $TRAVIS_BRANCH =~ $TEST_FLAVOR_REGEX ]];
then
  if [[ $TRAVIS_TAG =~ $PROD_FLAVOR_REGEX ]];
  then
    FLAVOR=prod
  else
    FLAVOR=test
  fi
else
  FLAVOR=dev
fi
NODE_APP_INSTANCE=$FLAVOR

# Extract the name of the app
APP=$(node -p -e "require('./package.json').name")

# Exports addtionnal variables
VERSION=$(node -p -e "require('./package.json').version")
TAG=$VERSION-$FLAVOR

# Clone the workspace 
echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace

# Define the CLI workspace to be used for building process
if [ -f workspace/$FLAVOR/$APP.js ]
then
  export PROJECT=workspace/$FLAVOR/$APP.js
else
  export PROJECT=workspace/$APP.js
fi

# Read extra environment variables (merges common and flavor env)
cp workspace/common/.env .env
if [ -f workspace/$FLAVOR/.env ]
then
  echo merging $FLAVOR/.env file with common .env
  cat workspace/$FLAVOR/.env >> .env
fi

set -a
. .env
set +a

# Read ci environement variables
cp workspace/common/.travis.env .travis.env
if [ -f workspace/$FLAVOR/.travis.env ]
then
  echo merging $FLAVOR/.travis.env with common .travis.env
  cat workspace/$FLAVOR/.travis.env >> .travis.env
fi

set -a
. .travis.env
set +a

BUILDS_BUCKET=$APP-builds

