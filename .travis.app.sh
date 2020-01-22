#!/bin/bash
source .travis.env.sh

#
# Build the app
#
travis_fold start "build"

# Build the image
docker-compose -f deploy/app.yml -f deploy/app.build.yml build
ERROR_CODE=$?
if [ $ERROR_CODE -ne 0 ]; then
	echo "Building the docker image has failed [error: $ERROR_CODE]"
	exit 1
fi

# Tag the built image and push it to the hub
docker tag kalisio/$APP kalisio/$APP:$VERSION_TAG
docker login -u="$DOCKER_USER" -p="$DOCKER_PASSWORD"
docker push kalisio/$APP:$VERSION_TAG
ERROR_CODE=$?
if [ $ERROR_CODE -eq 1 ]; then
	echo "Pushing the docker image has failed [error: $ERROR_CODE]"
	exit 1
fi


travis_fold end "build"

#
# Deploy the app
#
travis_fold start "deploy"

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

travis_fold end "deploy"
