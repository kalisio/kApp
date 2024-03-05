#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

PUBLISH=false
while getopts "p" OPT; do
    case $OPT in
        p) # defines mongo version
            PUBLISH=true;;
        *)
            ;;
    esac
done

## Init workspace
##

WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

## Build docs
##

# Build process requires node 18
use_node 18

rm -f .postcssrc.js && cd docs && yarn install && yarn build

if [ "$PUBLISH" = true ]; then
    load_env_files "$WORKSPACE_DIR/development/common/KAPP_PUSH_DOC_TOKEN.enc.env"

    GIT_COMMIT_SHA=$(get_git_commit_sha "$ROOT_DIR")
    GIT_COMMITTER=$(get_git_committer_infos "$ROOT_DIR")
    deploy_gh_pages \
        "https://oauth2:$KAPP_PUSH_DOC_TOKEN@github.com/kalisio/kApp.git" \
        "$ROOT_DIR/docs/.vitepress/dist" \
        "$GIT_COMMITTER" \
        "Docs built from $GIT_COMMIT_SHA"
fi
