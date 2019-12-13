#!/bin/bash
source .travis.env.sh

# It first need to create the required network and run mongodb
docker network create --attachable $DOCKER_NETWORK

#
# Test the api
#
travis_fold start "api"

# Output directory for server coverage
mkdir coverage
chmod -R 777 coverage

# Run the tests
docker-compose -f deploy/mongodb.yml -f deploy/app.yml -f deploy/app.test.server.yml up app
#ERROR_CODE=$?
# Backup the server coverages whatever the result
#codeclimate-test-reporter < ./coverage/lcov.info
#aws s3 sync ./cc-test-reporter s3://$BUILDS_BUCKET/$BUILD_NUMBER/api-coverage > /dev/null
#if [ $ERROR_CODE -eq 1 ]; then
#	echo "Testing ${APP} API failed [error: $ERROR_CODE]"
#	exit 1
#fi

travis_fold end "api"

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
