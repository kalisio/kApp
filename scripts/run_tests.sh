#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/lib.sh"

NODE_VER=16
MONGO_VER=4
while getopts "m:n:" option; do
    case $option in
        m) # defines mongo version
            MONGO_VER=$OPTARG;;
        n) # defines node version
            NODE_VER=$OPTARG;;
        *)
            ;;
    esac
done

if [ "$CI" = true ]; then
    begin_group "Fetching project dependencies ..."

    WORKSPACE_DIR="$(dirname "$ROOT_PATH")"
    DEVELOPMENT_REPO_DIR="$WORKSPACE_DIR/development"

    # Workaround since repo is kApp with a 'A' and in kli file it's kapp with a 'a'
    ln -s "$WORKSPACE_DIR/kApp" "$WORKSPACE_DIR/kapp"

    # clone developement
    git clone --depth 1 "https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git" "$DEVELOPMENT_REPO_DIR"

    get_app_infos "$ROOT_PATH" "$DEVELOPMENT_REPO_DIR/workspaces/apps"
    APP="${APP_INFOS[0]}"
    VERSION="${APP_INFOS[1]}"
    FLAVOR="${APP_INFOS[2]}"
    KLI_FILE="${APP_INFOS[3]}"

    run_kli "$WORKSPACE_DIR" "$KLI_FILE" "$NODE_VER"

    end_group "Fetching project dependencies ..."

    echo "Used kli file $KLI_FILE ..."
    echo "About to run tests for ${APP}@${VERSION} ($FLAVOR) ..."
else
    DEVELOPMENT_REPO_DIR="$KALISIO_DEVELOPMENT_DIR/development"
fi

## Start mongo
##

begin_group "Starting mongo $MONGO_VER ..."

use_mongo "$MONGO_VER"
k-mongo

end_group "Starting mongo $MONGO_VER ..."

## Load project env
##

. "$DEVELOPMENT_REPO_DIR/workspaces/apps/apps.sh" kapp

## Run tests
##

use_node "$NODE_VER"
yarn test:server
