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
	KEY_CHAIN=ios-build.keychain
	KEY_CHAIN_PASSWORD=travis

	# Set working directory
	#CWD=$(pwd)
	#cd "$(dirname "$0")"

	# Create a custom keychain
	security create-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN

	# Unlock the keychain
	security unlock-keychain -p $KEY_CHAIN_PASSWORD $KEY_CHAIN

	# Set keychain timeout to 1 hour for long builds
	# see http://www.egeek.me/2013/02/23/jenkins-and-xcode-user-interaction-is-not-allowed/
	security set-keychain-settings -t 3600 -u $KEY_CHAIN

	# Set keychain search list
	security list-keychains -s $KEY_CHAIN

	# Make the custom keychain default, so xcodebuild will use it for signing
	security default-keychain -s $KEY_CHAIN

	# Add certificates to keychain and allow codesign to access them
	security import kApp-secrets/ios/AppleWWDRCA.cer AppleWWDRCA.cer -k $KEY_CHAIN -T /usr/bin/codesign

	# Restore working directory
	#cd -

	# Install the required secret files requied to sign the app
	cp kApp-secrets/ios/build.json cordova/.
	mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
	cp kApp-secrets/ios/*.mobileprovision ~/Library/MobileDevice/Provisioning\ Profiles/.

	# Build and deploy the app
	npm run cordova:deploy:ios

  # Backup the ios build to S3
	aws s3 sync cordova/platforms/ios/build s3://kapp-builds/$TRAVIS_BUILD_NUMBER/ios
fi
