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

# Build the api
cd api && yarn build
chcheck_code $? "Building the api"

# Build the client
cd .. && yarn build > build.log 2>&1 && tail -n 24 build.log 
chcheck_code $? "Builing the client"

# Create an archive to speed docker build process
cd ../..
tar -zcf kdk.tgz kdk
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile.app -t kalisio/$APP:$TAG . 
chcheck_code $? "Building the app docker image"

docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile.tests.client -t kalisio/$APP:$FLAVOR-tests-client . 
chcheck_code $? "Building the tests client docker image"

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

# Push the docker image to the hub
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker push kalisio/$APP:$TAG
chcheck_code $? "Pushing the $TAG app docker image"

docker tag kalisio/$APP:$TAG kalisio/$APP:$FLAVOR
docker push kalisio/$APP:$FLAVOR
chcheck_code $? "Pushing the $FLAVOR app docker image"

docker push kalisio/$APP:$FLAVOR-tests-client
chcheck_code $? "Pushing the $FLAVOR tests-client docker image"

# Copy the required keys and update the mode
cp workspace/$FLAVOR/*.pem ~/.ssh/.
for KEY in `ls ~/.ssh/*.pem`; do
	chmod 600 $KEY
done
# Copy the ssh config file
# Note: it does not seem necessary to restart the service (service sshd reload)
cp workspace/$FLAVOR/ssh.config ~/.ssh/config
# Deploy the stack
ssh REMOTE_SERVER "cd kargo; ./kargo remove $APP; ./kargo deploy $APP"
chcheck_code $? "Deploying the app"

travis_fold end "deploy"
