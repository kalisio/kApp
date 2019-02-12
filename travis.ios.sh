#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip ios]"* ]]
then
	echo "Skipping ios stage"
else
	source travis.env.sh

  # Retrieve the built Web app
	aws s3 sync s3://kapp-builds/$TRAVIS_BUILD_NUMBER/dist cordova/www

	# Retrieve the secret files
	echo -e "machine github.com\n  login $GITHUB_TOKEN" > ~/.netrc
	git clone https://github.com/kalisio/kApp-secrets

	# Create the keychain
	KEY_CHAIN_NAME=ios-build.keychain
	KEY_CHAIN_PASSWORD=travis

	# Create a custom keychain
	security create-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN_NAME
	security default-keychain -s $KEY_CHAIN_NAME
	security unlock-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN_NAME
  
	#security set-keychain-settings -t 3600 -u $KEY_CHAIN_NAME

	#security list-keychains -s $KEY_CHAIN

	# Add certificates to keychain and allow codesign to access them
	# see: https://github.com/travis-ci/travis-ci/issues/6791#issuecomment-261215038
	security import kApp-secrets/ios/AppleWWDRCA.cer -k $KEY_CHAIN_NAME -A
	security import kApp-secrets/ios/ios_distribution.cer -k $KEY_CHAIN_NAME -A
	security import kApp-secrets/ios/ios_distribution.p12 -k $KEY_CHAIN_NAME -P $APPLE_KEY_PASSWORD -A

	# see: https://docs.travis-ci.com/user/common-build-problems/#mac-macos-sierra-1012-code-signing-errors
  security set-key-partition-list -S apple-tool:,apple: -s -k keychainPass $KEY_CHAIN_NAME

	# Install the required secret files requied to sign the app
	cp kApp-secrets/ios/build.json cordova/.
	mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
	cp kApp-secrets/ios/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/.

	# Build and deploy the app
	npm run cordova:add:ios
	npm run cordova:build:release

  # Backup the ios build to S3
	aws s3 sync cordova/platforms/ios s3://kapp-builds/$TRAVIS_BUILD_NUMBER/ios
fi
