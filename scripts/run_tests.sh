#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

NODE_VER=16
MONGO_VER=4
while getopts "m:n:r" option; do
    case $option in
        m) # defines mongo version
            MONGO_VER=$OPTARG
            ;;
        n) # defines node version
            NODE_VER=$OPTARG
             ;;
        r) # report outcome to slack
            trap 'slack_ci_report "$ROOT_DIR" "$?" "$SLACK_WEBHOOK_APPS"' EXIT
            ;;
        *)
            ;;
    esac
done

## Init workspace
##

WORKSPACE_DIR="$(dirname "$ROOT_DIR")"
init_app_infos "$ROOT_DIR" "$WORKSPACE_DIR/development/workspaces/apps"

APP=$(get_app_name)
VERSION=$(get_app_version)
FLAVOR=$(get_app_flavor)

echo "About to run tests for ${APP} v${VERSION}-($FLAVOR) ..."

. "$WORKSPACE_DIR/development/workspaces/apps/apps.sh" kapp
load_env_files "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"

## Start mongo
##

begin_group "Starting mongo $MONGO_VER ..."

use_mongo "$MONGO_VER"
k-mongo

end_group "Starting mongo $MONGO_VER ..."

## Run tests
##

use_node "$NODE_VER"
yarn test:server
