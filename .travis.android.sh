#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip android]"* ]]
then
	echo "Skipping android stage"
else
	source .travis.env.sh

	 # Retrieve the built Web app
	aws s3 sync s3://$APP-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www > /dev/null

		# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone -b $APP https://github.com/kalisio/kdk-workspaces workspace

		# Install the required secret files requied to sign the app
	cp workspace/FLAVOR/android/* cordova/
	
	# Build and deploy the mobile app	
  echo json_key_file\(\"google-play.json\"\) > cordova/fastlane/Appfile
  echo package_name\(\"com.kalisio.$APP\"\) >> cordova/fastlane/Appfile
  export ORG_GRADLE_PROJECT_cdvVersionCode=$TRAVIS_BUILD_NUMBER
	npm run cordova:deploy:android

	# Store the android build to S3
	aws s3 sync cordova/platforms/android/app/build/outputs/apk s3://$APP-builds/$TRAVIS_BUILD_NUMBER/android > /dev/null
	if [ $? -eq 1 ]; then
		exit 1
	fi
fi
