#!/bin/bash

# Pull kCore
git clone -b $TRAVIS_BRANCH https://github.com/kalisio/kCore kCore
cd kCore &&	yarn && yarn link && cd .. 
yarn link @kalisio/kdk-core 


 