#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip android]"* ]]
then
	echo "Skipping android stage"
else
	source travis.env.sh
	export ORG_GRADLE_PROJECT_cdvVersionCode=$TRAVIS_BUILD_NUMBER
	cd cordova/fastlane
	sh android.sh
	npm run cordova:deploy:android

	# Store the android build to S3
	aws s3 sync cordova/platforms/android/build/outputs/apk s3://kapp-builds/$TRAVIS_BUILD_NUMBER/android
fi
