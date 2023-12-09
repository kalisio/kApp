#!/bin/bash

check_code()
{
   if [[ $1 -ne $2 ]]; then
	  echo "$3 has failed [error: $1]"
	  exit 1
  fi
}

#
# Provision the required files
#
chmod +x ./.github/workflows/env.sh
./.github/workflows/env.sh

#
# Build the app
#
echo "##[group]Build"

cd $APP
yarn pwa:build
EXIT_CODE=$? 
check_code $EXIT_CODE 0 "Builing the client" 

# Log in to docker before building the app because of rate limiting
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
check_code $? 0 "Connecting to Docker"

# Create an archive to speed docker build process
cd ../..
tar --exclude='$APP/test' -zcf $GITHUB_WORKSPACE/kalisio.tgz kalisio

# Build the image
cd $GITHUB_WORKSPACE
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$GITHUB_RUN_NUMBER -f dockerfile -t kalisio/$APP:$TAG . 
check_code $? 0 "Building the app docker image"

echo "##[endgroup]"

#
# Deploy the app
#
echo "##[group]Deploy"

# Push the app image to the hub with the version tag
docker push kalisio/$APP:$TAG
check_code $? 0 "Pushing the $APP:$TAG docker image"

# Push the app image to the hub with the flavor tag
docker tag kalisio/$APP:$TAG kalisio/$APP:$FLAVOR
docker push kalisio/$APP:$FLAVOR
check_code $? 0 "Pushing the $APP:$TAG docker image"

echo "##[endgroup]"
