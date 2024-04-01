#!/usr/bin/env bash
set -euo pipefail
# set -x

APP=$1
SLACK_WEBHOOK=$2

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Report outcome to slack
## 

trap 'slack_e2e_report "$APP" "$?" "$SLACK_WEBHOOK"' EXIT

## Run tests & redirect output to a log file
##

mkdir -p "$ROOT_DIR/test/run"
yarn test:client > "$ROOT_DIR/test/run/e2e_test_log.txt" 2>&1

## Upload logs & screenshots to S3 bucket
##

#rclone copy "$ROOT_DIR/test/run" ovh:/dev/e2e_test
