#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")
WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

PUBLISH=false
while getopts "p" option; do
    case $option in
        p) # define to publish built container to registry
            PUBLISH=true
            ;;
        *)
            ;;
    esac
done

## Report to slack
##

load_env_files "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
trap 'slack_ci_report "$ROOT_DIR" "Build e2e tests" "$?" "$SLACK_WEBHOOK_APPS"' EXIT

## Build e2e tests
##

build_e2e_tests "$ROOT_DIR" "$PUBLISH"
