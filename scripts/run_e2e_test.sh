#!/usr/bin/env bash
set -euo pipefail
# set -x

APP=$1
SLACK_WEBHOOK=$2
LINK=""

CURRENT_DATE=$(date +"%d-%m-%Y")

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Report outcome to slack
## 

trap 'slack_e2e_report "$APP" "$?" "$SLACK_WEBHOOK" "$LINK"' EXIT

## Run tests & redirect output to a log file
##

mkdir -p "$ROOT_DIR/test/run/chrome"
yarn test:client > "$ROOT_DIR/test/run/chrome/e2e_test_log.txt" 2>&1

# PUPPETEER_PRODUCT=firefox yarn add puppeteer
#  yarn link "@kalisio/kdk" --link-folder /opt/kalisio/yarn-links
# export BROWSER="firefox"bucket
# mkdir -p "$ROOT_DIR/test/run/firefox"
# yarn test:client 

## Upload logs & screenshots to S3
##

rclone copy "$ROOT_DIR/test/run" "ovh:/dev/$APP/e2e_tests/$CURRENT_DATE"
LINK=$(rclone link "ovh:/dev/$APP/e2e_tests/$CURRENT_DATE")