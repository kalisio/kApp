#!/usr/bin/env bash
set -uo pipefail
# set -x

APP=$1

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Run tests & redirect output to a log file
##

# Chrome
mkdir -p "$ROOT_DIR/test/run/chrome"
yarn test:client > "$ROOT_DIR/test/run/chrome/chrome_logs.txt" 2>&1
RET_CODE=$?

# Firefox
# PUPPETEER_PRODUCT=firefox yarn add puppeteer
# yarn link "@kalisio/kdk" --link-folder /opt/kalisio/yarn-links
# export BROWSER="firefox"bucket
# mkdir -p "$ROOT_DIR/test/run/firefox"
# yarn test:client  > "$ROOT_DIR/test/run/chrome/firefox_logs.txt" 2>&1

## Upload logs & screenshots to S3
##

CURRENT_DATE=$(date +"%d-%m-%Y")
CHROME_LOGS_LINK=""
SCREEN_LINK=""

zip -r "$ROOT_DIR/test/screenshots.zip" "$ROOT_DIR/test/run"

rclone copy "$ROOT_DIR/test/run/chrome/chrome_logs.txt" "ovh-s3:/dev/e2e-tests/$APP/$CURRENT_DATE"
CHROME_LOGS_LINK=$(rclone link "ovh-s3:/dev/e2e-tests/$APP/$CURRENT_DATE/chrome_logs.txt")

rclone copy "$ROOT_DIR/test/screenshots.zip" "ovh-s3:/dev/e2e-tests/$APP/$CURRENT_DATE"
SCREEN_LINK=$(rclone link "ovh-s3:/dev/e2e-tests/$APP/$CURRENT_DATE/screenshots.zip")

## Report outcome to slack
##

slack_e2e_report "$APP" "$RET_CODE" "$SLACK_WEBHOOK" "$CHROME_LOGS_LINK" "$SCREEN_LINK"