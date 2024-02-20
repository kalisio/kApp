#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

## Parse options
##

WORKSPACE_BRANCH=
WORKSPACE_TAG=
WORKSPACE_NODE=16
WORKSPACE_FULL=false
OPT_LIST="n:f"
if [ "$CI" != true ]; then
    OPT_LIST="b:n:t:f"
fi
while getopts "$OPT_LIST" OPT; do
    case $OPT in
        b) # defines branch
            WORKSPACE_BRANCH=$OPTARG;;
        n) # defines node version
            WORKSPACE_NODE=$OPTARG;;
        t) # defines venv tag
            WORKSPACE_TAG=$OPTARG;;
        f) # to use kli to install & link = full
            WORKSPACE_FULL=true;;
        *)
        ;;
    esac
done

shift $((OPTIND-1))
WORKSPACE_DIR="${1:-$(dirname "$ROOT_DIR")}"
DEVELOPMENT_DIR="$WORKSPACE_DIR/development"

begin_group "Cloning development repo ..."

if [ "$CI" = true ]; then
    # workaround since repo is kApp with a 'A' and in kli file it's kapp with a 'a'
    mv "$WORKSPACE_DIR/kApp" "$WORKSPACE_DIR/kapp"
    ln -s "$WORKSPACE_DIR/kapp" "$WORKSPACE_DIR/kApp"

    DEVELOPMENT_REPO_URL="https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git"
else
    GIT_OPS=
    if [ -n "$WORKSPACE_TAG" ] || [ -n "$WORKSPACE_BRANCH" ]; then
        GIT_OPS="--branch ${WORKSPACE_TAG:-$WORKSPACE_BRANCH}"
    fi
    git clone --depth 1 $GIT_OPS "$GITHUB_URL/kalisio/kApp.git" "$WORKSPACE_DIR/kapp"

    DEVELOPMENT_REPO_URL="$GITHUB_URL/kalisio/development.git"

    # unset KALISIO_DEVELOPMENT_DIR because we want kli to clone everyhting in $WORKSPACE_DIR
    unset KALISIO_DEVELOPMENT_DIR
fi

# clone development in $WORKSPACE_DIR
git clone --depth 1 "$DEVELOPMENT_REPO_URL" "$DEVELOPMENT_DIR"

end_group "Cloning development repo ..."

# select kli file for dependencies
init_app_infos "$WORKSPACE_DIR/kapp" "$DEVELOPMENT_DIR/workspaces/apps"
KLI_FILE=$(get_app_kli_file)

echo "About to setup workspace using $KLI_FILE ..."

begin_group "Running kli ..."

# clone kli in venv if not there
if [ ! -d "$WORKSPACE_DIR/kli" ]; then
    git clone --depth 1 "https://github.com/kalisio/kli.git" "$WORKSPACE_DIR/kli"
    cd "$WORKSPACE_DIR/kli" && nvm exec "$WORKSPACE_NODE" yarn install && cd ~-
fi

cd "$WORKSPACE_DIR"
nvm exec "$WORKSPACE_NODE" node "$WORKSPACE_DIR/kli/index.js" "$KLI_FILE" --clone --shallow-clone
if [ "$WORKSPACE_FULL" = true ]; then
    nvm exec "$WORKSPACE_NODE" node "$WORKSPACE_DIR/kli/index.js" "$KLI_FILE" --install
    nvm exec "$WORKSPACE_NODE" node "$WORKSPACE_DIR/kli/index.js" "$KLI_FILE" --link --link-folder "$WORKSPACE_DIR/yarn-links"
fi
cd ~-

end_group "Running kli ..."
