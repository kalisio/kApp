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
FORCE=false
while getopts "pf" OPT; do
    case $OPT in
        p) # defines mongo version
            PUBLISH=true;;
        f) # force run (skip [build doc] requirement)
            FORCE=true;;
        *)
            ;;
    esac
done

RUN_REGEX="\[build docs?\]"
if [[ "$FORCE" = false ]] && [[ ! "$(get_git_commit_message "$ROOT_DIR")" =~ $RUN_REGEX ]]; then
    echo "Skipping job since '$RUN_REGEX' is not included in commit message."
    echo "Add -f to force."
    exit 0
fi

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

    COMMIT_SHA=$(get_git_commit_sha "$ROOT_DIR")
    COMMIT_AUTHOR_NAME=$(get_git_commit_author_name "$ROOT_DIR")
    COMMIT_AUTHOR_EMAIL=$(get_git_commit_author_email "$ROOT_DIR")
    deploy_gh_pages \
        "https://oauth2:$KAPP_PUSH_DOC_TOKEN@github.com/kalisio/kApp.git" \
        "$ROOT_DIR/docs/.vitepress/dist" \
        "$COMMIT_AUTHOR_NAME" \
        "$COMMIT_AUTHOR_EMAIL" \
        "Docs built from $COMMIT_SHA"
fi
