#!/bin/bash

push_docker () {
	docker push kalisio/$1:$2
	check_code $? "Pushing the $2 $1 docker image"
	docker tag kalisio/$1:$2 kalisio/$1:$3
	docker push kalisio/$1:$3
	check_code $? "Pushing the $3 $1 docker image"
}

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
check_code $? "Building the api"

# Build the client
cd .. && yarn build > build.log 2>&1 && tail -n 24 build.log 
check_code $? "Builing the client"

# Create an archive to speed docker build process
cd ../..
tar -zcf kdk.tgz kdk
docker build --build-arg APP=$APP --build-arg FLAVOR=$FLAVOR --build-arg BUILD_NUMBER=$BUILD_NUMBER -f dockerfile -t kalisio/$APP:$TAG . 
check_code $? "Building the app docker image"

docker build --build-arg APP=$APP --build-arg TAG=$TAG -f dockerfile.api-tests -t kalisio/$APP:${TAG}_api-tests . 
check_code $? "Building the tests api docker image"

docker build --build-arg APP=$APP -f dockerfile.client-tests -t kalisio/$APP:${TAG}_cllent-tests . 
check_code $? "Building the tests client docker image"

travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
check_code $? "Connecting to Docker"

# Push the app image to the hub
push_docker $APP $TAG $FLAVOR 

# Push the tests api image to the hub
push_docker $APP ${TAG}_api-tests ${FLAVOR}_api-tests

# Push the tests client image to the hub
push_docker $APP ${TAG}_cllent-tests ${FLAVOR}_cllent-tests

# Copy the required keys and update the mode
cp workspace/$FLAVOR/*.pem ~/.ssh/.
for KEY in `ls ~/.ssh/*.pem`; do
	chmod 600 $KEY
done
# Copy the ssh config file
# Note: it does not seem necessary to restart the service (service sshd reload)
cp workspace/$FLAVOR/ssh.config ~/.ssh/config
# Deploy the stack
ssh REMOTE_SERVER "cd kargo; ./kargo remove $APP; ./kargo deploy $APP; sleep 120; ./kargo test $APP"
check_code $? "Deploying the app"

travis_fold end "deploy"
