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

use_node "$NODE_VER"
use_mongo "$MONGO_VER"

if [ "$CI" = true ]; then
    WORKSPACE_DIR="$(dirname "$ROOT_PATH")"

    # Workaround since repo is kApp with a 'A' and in kli file it's kapp with a 'a'
    ln -s "$WORKSPACE_DIR/kApp" "$WORKSPACE_DIR/kapp"

    # clone developement into $KALISIO_DEVELOPMENT_DIR
    git clone --depth 1 "https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git" "$WORKSPACE_DIR/development"

    get_app_infos "$ROOT_PATH" "$WORKSPACE_DIR/development/workspaces/apps"
    APP="${APP_INFOS[0]}"
    VERSION="${APP_INFOS[1]}"
    FLAVOR="${APP_INFOS[2]}"
    KLI_FILE="${APP_INFOS[3]}"

    run_kli "$WORKSPACE_DIR" "$KLI_FILE" "$NODE_VER"
fi

yarn test:server
