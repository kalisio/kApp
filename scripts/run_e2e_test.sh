#!/usr/bin/env bash
set -euo pipefail
# set -x

APP=$1
SLACK_WEBHOOK=$2

GOOGLE_LOGS_LINK=""
SCREEN_LINK=""

CURRENT_DATE=$(date +"%d-%m-%Y")

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Report outcome to slack
## 

trap 'slack_e2e_report "$APP" "$?" "$SLACK_WEBHOOK" "$GOOGLE_LOGS_LINK" "$SCREEN_LINK"' EXIT

## Run tests & redirect output to a log file
##

mkdir -p "$ROOT_DIR/test/run/chrome"
yarn test:client > "$ROOT_DIR/test/run/chrome/google_logs.txt" 2>&1

# PUPPETEER_PRODUCT=firefox yarn add puppeteer
#  yarn link "@kalisio/kdk" --link-folder /opt/kalisio/yarn-links
# export BROWSER="firefox"bucket
# mkdir -p "$ROOT_DIR/test/run/firefox"
# yarn test:client 

## Upload logs & screenshots to S3
##

cd "$ROOT_DIR/test"
zip -r "$ROOT_DIR/test/screenshots.zip" run

rclone copy "$ROOT_DIR/test/run/chrome/google_logs.txt" "ovh-s3:/dev/e2e_tests/$APP/$CURRENT_DATE"
GOOGLE_LOGS_LINK=$(rclone link "ovh-s3:/dev/e2e_tests/$APP/$CURRENT_DATE/google_logs.txt")

rclone copy "$ROOT_DIR/test/screenshots.zip" "ovh-s3:/dev/e2e_tests/$APP/$CURRENT_DATE"
SCREEN_LINK=$(rclone link "ovh-s3:/dev/e2e_tests/$APP/$CURRENT_DATE/screenshots.zip")