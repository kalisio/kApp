#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip android]"* ]]
then
	echo "Skipping android stage"
else
	source .travis.env.sh

  #
	# Provision the required files
	#
	travis_fold start "privision"

	# Retrieve the built Web app
	aws s3 sync s3://$APP-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www > /dev/null

		# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace

	# Install the required secret files requied to sign the app
	ls workspace/$FLAVOR/android/
	cp workspace/$FLAVOR/android/*.json cordova/
	cp workspace/$FLAVOR/android/kalisio.keystore cordova/
	cp workspace/$FLAVOR/android/Appfile cordova/fastlane/
	
	travis_fold end "privision"

	#
	# Build the app
	#
	travis_fold start "build"

	# Increment the build number
	export ORG_GRADLE_PROJECT_cdvVersionCode=$TRAVIS_BUILD_NUMBER

	# Build and deploy the mobile app	
	npm run cordova:build:android
	if [ $? -ne 0 ]; then
		exit 1
	fi

  travis_fold end "build"

	#
  # Deploy the app
	#
	travis_fold start "deploy"

  # Deploy the APK to GooglePlay
	cd cordova && fastlane android $NODE_APP_INSTANCE && cd ..
	if [ $? -ne 0 ]; then
		exit 1
	fi

	# Store the android build to S3
	aws s3 sync cordova/platforms/android/app/build/outputs/apk s3://$APP-builds/$TRAVIS_BUILD_NUMBER/android > /dev/null
	if [ $? -eq 1 ]; then
		exit 1
	fi

	travis_fold end "deploy"
fi
