#!/usr/bin/env bash
set -euo pipefail
# set -x

APP=$1
SLACK_WEBHOOK=$2

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")

. "$THIS_DIR/kash/kash.sh"

## Report outcome to slack
## 

trap 'slack_e2e_report "$APP" "$?" "$SLACK_WEBHOOK"' EXIT

## Run tests
##

cd .. && yarn test:client