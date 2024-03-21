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
WORKSPACE_KIND=klifull
OPT_LIST="n:k:"
if [ "$CI" != true ]; then
    OPT_LIST="b:n:t:k:"
fi

while getopts "$OPT_LIST" OPT; do
    case $OPT in
        b) # defines branch to pull
            WORKSPACE_BRANCH=$OPTARG;;
        n) # defines node version
            WORKSPACE_NODE=$OPTARG;;
        t) # defines tag to pull
            WORKSPACE_TAG=$OPTARG;;
        k) # workspace kind (nokli kli klifull)
            WORKSPACE_KIND=$OPTARG;;
        *)
        ;;
    esac
done

begin_group "Setting up workspace ..."

if [ "$CI" = true ]; then
    WORKSPACE_DIR="$(dirname "$ROOT_DIR")"

    # workaround since repo is kApp with a 'A' and in kli file it's kapp with a 'a'
    mv "$WORKSPACE_DIR/kApp" "$WORKSPACE_DIR/kapp"
    ln -s "$WORKSPACE_DIR/kapp" "$WORKSPACE_DIR/kApp"

    DEVELOPMENT_REPO_URL="https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git"
else
    shift $((OPTIND-1))
    WORKSPACE_DIR="$1"

    # NOTE: cloning kapp could be avoided if we could parse app_version from tag/branch name instead
    # In this case, the kli would clone kapp
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
DEVELOPMENT_DIR="$WORKSPACE_DIR/development"
git clone --depth 1 "$DEVELOPMENT_REPO_URL" "$DEVELOPMENT_DIR"

if [ "$WORKSPACE_KIND" = kli ] || [ "$WORKSPACE_KIND" = klifull ]; then
    # select kli file for dependencies
    init_app_infos "$WORKSPACE_DIR/kapp" "$DEVELOPMENT_DIR/workspaces/apps"
    KLI_FILE=$(get_app_kli_file)

    echo "About to populate workspace using $KLI_FILE ..."
    run_kli "$WORKSPACE_DIR" "$WORKSPACE_NODE" "$KLI_FILE" "$WORKSPACE_KIND"
fi

end_group "Setting up workspace ..."

if [ -n "${KLI_FILE:-}" ]; then
    echo "Workspace setup using $KLI_FILE"
fi
