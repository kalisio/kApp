#!/bin/bash
source .travis.env.sh

# It first need to create the required network and run mongodb
docker network create --attachable $DOCKER_NETWORK

# Install code climate
curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
chmod +x ./cc-test-reporter

# Create the coverage dir
mkdir coverage && chmod +w coverage

# Initialize code climate
./cc-test-reporter before-build

# Run the tests
docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.server.yml up app
ERROR_CODE=$?

# Fake that the sources are in /opt/${APP}/api/src (symbolik link does not work)
mkdir -p /opt/${APP}/api
cp -R api/src /opt/${APP}/api/src

echo -- coverage content:
ls ./coverage
echo -- /opt/${APP}/api/src content:
ls /opt/${APP}/api/src
echo -- api/src content:
ls api/src

# Report to code climate
./cc-test-reporter after-build -t lcov --exit-code $ERROR_CODE
# Backup the server coverages whatever the result
#codeclimate-test-reporter < ./coverage/lcov.info
#aws s3 sync ./cc-test-reporter s3://$BUILDS_BUCKET/$BUILD_NUMBER/api-coverage > /dev/null
if [ $ERROR_CODE -eq 1 ]; then
	echo "Testing ${APP} API failed [error: $ERROR_CODE]"
	exit 1
fi


#
# Test the client
#
#  travis_fold start "client"

# Output directory for client screenshots
#	mkdir client-screenshots
#	chmod -R 777 client-screenshots

# Run the app
#	docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.client.yml up testcafe
#	ERROR_CODE=$?
# Copy the screenshots whatever the result
#	aws s3 sync client-screenshots s3://$BUILDS_BUCKET/$BUILD_NUMBER/client-screenshots > /dev/null
#	if [ $ERROR_CODE -eq 1 ]; then
#		echo "Testing ${APP} client failed [error: $ERROR_CODE]"
#		exit 1
#	fi

#	travis_fold end "client"
