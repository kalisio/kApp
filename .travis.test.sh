#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip test]"* ]]
then
	echo "Skipping test stage"
else
	source .travis.env.sh
  #DOCKER_HOST=172.17.0.1
	DOCKER_HOST=$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')
	echo $DOCKER_HOST

	# It first need to create the required network 
	docker network create --attachable $DOCKER_NETWORK

	#
	# Test the api
	#
	travis_fold start "api"

	# Output directory for server coverage
	mkdir server-coverage
	chmod -R 777 server-coverage

	# Run the API tests
	docker-compose -f deploy/app.yml -f deploy/app.test.server.yml up app
	ERROR_CODE=$?
	if [ $ERROR_CODE -eq 1 ]; then
		echo "Testing ${APP} API failed [error: $ERROR_CODE]"
		exit 1
	fi

  # Backup the server coverages
	codeclimate-test-reporter < server-coverage/lcov.info
	aws s3 sync server-coverage s3://$BUILDS_BUCKET/$BUILD_NUMBER/server-coverage > /dev/null
	if [ $? -eq 1 ]; then
		exit 1
	fi

  travis_fold end "api"

  #
	# Test the client
	#
  travis_fold start "client"

	# Output directory for client screenshots
	mkdir client-screenshots
	chmod -R 777 client-screenshots
 
  # Run the app
	docker-compose -f deploy/app.yml -f deploy/app.test.client.yml up -d app
	ERROR_CODE=$?
	if [ $ERROR_CODE -eq 1 ]; then
		echo "Running ${App} failed [error: $ERROR_CODE]"
		exit 1
	fi

	# Run client tests
	docker-compose -f deploy/app.yml -f deploy/app.test.client.yml up testcafe
	ERROR_CODE=$?
	# Copy the screenshots whatever the result
	aws s3 sync client-screenshots s3://$BUILDS_BUCKET/$BUILD_NUMBER/client-screenshots > /dev/null
	if [ $ERROR_CODE -eq 1 ]; then
		echo "Testing ${App} frontend failed [error: $ERROR_CODE]"
		exit 1
	fi

	travis_fold end "client"
fi
