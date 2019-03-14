#!/bin/bash

# Define required environement variobles according the flavor
if [[ $TRAVIS_BRANCH == "master" ]]
then
	export DEBUG=
	export FLAVOR=dev
	export PACKAGE_ID=com.${AUTHOR:-kalisio}.$APP.dev
fi
if [[ $TRAVIS_BRANCH == "test" ]]
then
	export DEBUG=
	export FLAVOR=test
	export PACKAGE_ID=com.${AUTHOR:-kalisio}.$APP.test
fi
if [[ -n "$TRAVIS_TAG" ]]
then
	export DEBUG=
	export FLAVOR=prod
	export PACKAGE_ID=com.${AUTHOR:-kalisio}.$APP
fi

# Exports addtionnal variables
export VERSION=$(node -p -e "require('./package.json').version")
export BUILDS_BUCKET=$APP-builds

# Retrieve the environment variables stored in the workspace
echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace
cp workspace/$FLAVOR/.env .env

# Add computed variables
echo "NODE_APP_INSTANCE=$FLAVOR" >> .env
echo "BUILD_NUMBER=$TRAVIS_BUILD_NUMBER" >> .env

set -a
. .env
set +a


