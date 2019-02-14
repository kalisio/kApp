#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
	source .travis.env.sh

  # Retrieve the built Web app
	aws s3 sync s3://kapp-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www

	# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone -b kapp https://github.com/kalisio/kdk-workspaces workspace

	# Create a custom keychain
	security create-keychain -p travis ios-build.keychain
	security default-keychain -s ios-build.keychain
	security unlock-keychain -p travis ios-build.keychain
  security set-keychain-settings -t 3600 -l ~/Library/Keychains/ios-build.keychain

	# Add certificates to keychain and allow codesign to access them
	# see: https://github.com/travis-ci/travis-ci/issues/6791#issuecomment-261215038
	security import workspace/ios/AppleWWDRCA.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
	security import workspace/ios/ios_distribution.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
	security import workspace/ios/ios_distribution.p12 -k ~/Library/Keychains/ios-build.keychain -P $APPLE_KEY_PASSWORD -T /usr/bin/codesign

	# see: https://docs.travis-ci.com/user/common-build-problems/#mac-macos-sierra-1012-code-signing-errors
  security set-key-partition-list -S apple-tool:,apple: -s -k travis ios-build.keychain

	# Install the required secret files requied to sign the app
	cp workspace/ios/build.json cordova/.
	mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
	cp workspace/ios/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/

	# Build and deploy the app
	npm run cordova:add:ios
	npm run cordova:build:release

  # Backup the ios build to S3
	aws s3 sync cordova/platforms/ios/build/device s3://kapp-builds/$TRAVIS_BUILD_NUMBER/ios > /dev/null
	echo $?
	if [ $? -eq 1 ]; then
		exit 1
	fi
fi
