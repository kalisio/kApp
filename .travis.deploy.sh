#!/bin/bash
if [[ $TRAVIS_COMMIT_MESSAGE == *"[skip deploy]"* ]]
then
	echo "Skipping deploy stage"
else
	source .travis.env.sh

	#
	# Deploy the app
	#
	travis_fold start "deploy"

	cp workspace/$FLAVOR/*.pem ~/.ssh/.
	cp workspace/$FLAVOR/ssh.config ~/.ssh/config

  # Create app directory if needed 
	ssh remote mkdir -p $APP

	# Deploy environment file
	scp .env remote:~/$APP/.env

	# Deploy compose files
	scp deploy/app.yml remote:~/$APP/app.yml
	scp deploy/app.swarm.yml remote:~/$APP/app.swarm.yml
	scp deploy/mongodb.yml remote:~/$APP/mongodb.yml
	scp deploy/mongodb.swarm.yml remote:~/$APP/mongodb.swarm.yml

	# Deploy utilities
	scp deploy/deploy-app.sh remote:~/$APP
	scp deploy/remove-app.sh remote:~/$APP

	# Deploy the stack
	SUDO=""
	if [ "$SSH_USER" != "root" ]; then
		SUDO="sudo"
	fi
	ssh remote "cd $APP; chmod u+x ./remove-app.sh; chmod u+x ./deploy-app.sh"
	ssh remote "cd $APP; ./remove-app.sh; k-swarm-prune; ./deploy-app.sh"

	travis_fold end "deploy"
fi

