#!/bin/bash

check_code()
{
   if [ $1 -eq 1 ]; then
	  echo "$2 has failed [error: $1]"
	  exit 1
  fi
}

parse_semver() 
{
  local RE='[^0-9]*\([0-9]*\)[.]\([0-9]*\)[.]\([0-9]*\)\([0-9A-Za-z-]*\)'
  # Major 
  eval $2=`echo $1 | sed -e "s#$RE#\1#"`
  # Minor
  eval $3=`echo $1 | sed -e "s#$RE#\2#"`
  # Patch
  eval $4=`echo $1 | sed -e "s#$RE#\3#"`
}

# Extract the name of the app
APP=$(node -p -e "require('./package.json').name")

# Exports addtionnal variables
VERSION=$(node -p -e "require('./package.json').version")
MAJOR=0
MINOR=0
PATCH=0
parse_semver $VERSION MAJOR MINOR PATCH

echo "Building $APP v$MAJOR.$MINOR.$PATCH"

# Clone the workspace 
echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace

# Define the flavor
TEST_FLAVOR_REGEX="^test$|-test$"
PROD_FLAVOR_REGEX="^v[0-9]+\.[0-9]+\.[0-9]+"
if [[ $TRAVIS_BRANCH =~ $TEST_FLAVOR_REGEX ]];
then
  if [[ $TRAVIS_TAG =~ $PROD_FLAVOR_REGEX ]];
  then
    export FLAVOR=prod
    KDK_PROJECT_FILE=$APP-$VERSION.js
  else
    export FLAVOR=test
    KDK_PROJECT_FILE=$APP-$MAJOR-$MINOR.js
  fi
else
  export FLAVOR=dev
  KDK_PROJECT_FILE=$APP.js
fi
export NODE_APP_INSTANCE=$FLAVOR
TAG=$VERSION-$FLAVOR

echo "Build flavor is $FLAVOR"

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

export BUILD_NUMBER=$TRAVIS_BUILD_NUMBER
BUILD_BUCKET=${APP}-builds/$BUILD_NUMBER

# Install the kdk
git clone https://github.com/kalisio/kli.git kalisio && cd kalisio && yarn 

# Clone the project and install the dependencies
cp $TRAVIS_BUILD_DIR/workspace/$FLAVOR/$KDK_PROJECT_FILE $APP.js
node . $APP.js --clone $TRAVIS_BRANCH
node . $APP.js --install
node . $APP.js --link

cd $APP

