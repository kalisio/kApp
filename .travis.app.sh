#!/bin/bash

#
# Provision the required files
#
travis_fold start "provision"

source .travis.env.sh

travis_fold end "provision"

#
# Build the app
#
travis_fold start "build"

yarn build
EXIT_CODE=$? 
tail -n 24 build.log
check_code $EXIT_CODE 0 "Builing the client" 

# Log in to docker before building the app because of rate limiting
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
check_code $? 0 "Connecting to Docker"

# Create an archive to speed docker build process
cd ..
tar --exclude='$APP/test' -zcf kalisio.tgz $APP
cp kalisio.tgz $APP/.

# Build the image
cd $APP
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile -t kalisio/$APP:$TAG . 
check_code $? 0 "Building the app docker image"

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

# Push the app image to the hub with the version tag
docker push kalisio/$APP:$TAG
check_code $? 0 "Pushing the $APP:$TAG docker image"

# Push the app image to the hub with the flavor tag
docker tag kalisio/$APP:$TAG kalisio/$APP:$FLAVOR
docker push kalisio/$APP:$FLAVOR
check_code $? 0 "Pushing the $APP:$TAG docker image"

travis_fold end "deploy"

