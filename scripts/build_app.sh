#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/kash/kash.sh"

## Parse options
##

PUBLISH=false
while getopts "p" option; do
    case $option in
        p) # defines mongo version
            PUBLISH=true;;
        *)
            ;;
    esac
done

### Handle CI/dev environment
###

if [ "$CI" = true ]; then
    begin_group "Fetching project dependencies ..."

    WORKSPACE_DIR="$(dirname "$ROOT_PATH")"

    # Workaround since repo is kApp with a 'A' and in kli file it's kapp with a 'a'
    ln -s "$WORKSPACE_DIR/kApp" "$WORKSPACE_DIR/kapp"

    # clone developement
    git clone --depth 1 "https://$GITHUB_DEVELOPMENT_PAT@github.com/kalisio/development.git" "$WORKSPACE_DIR/development"
    # clone kli
    git clone --depth 1 "https://github.com/kalisio/kli.git" "$WORKSPACE_DIR/kli"
    cd "$WORKSPACE_DIR/kli" && yarn install && cd ~-
    # clone app dependencies
    init_app_infos "$ROOT_PATH" "$WORKSPACE_DIR/development/workspaces/apps"
    KLI_FILE=$(get_app_kli_file)
    echo "Will use kli file $KLI_FILE to fetch dependencies ..."
    cd "$WORKSPACE_DIR" && node "$WORKSPACE_DIR/kli" "$KLI_FILE" --clone --shallow-clone && cd ~-

    end_group "Fetching project dependencies ..."
else
    WORKSPACE_DIR="$KALISIO_DEVELOPMENT_DIR"

    init_app_infos "$ROOT_PATH" "$WORKSPACE_DIR/development/workspaces/apps"
fi

APP=$(get_app_name)
VERSION=$(get_app_version)
FLAVOR=$(get_app_flavor)

echo "About to build ${APP} v${VERSION}-$FLAVOR ..."

## Load project env
##

. "$WORKSPACE_DIR/development/workspaces/apps/apps.sh" kapp

## Build container
##

# kli file is used in container to install, link
KLI_FILE=$(get_app_kli_file)
cp "$KLI_FILE" "$WORKSPACE_DIR/kli.js"
echo "Will use kli file $KLI_FILE to install and link modules ..."

IMAGE_NAME="kalisio/$APP"
IMAGE_TAG="$VERSION-$FLAVOR"

docker login --username "$KALISIO_DOCKERHUB_USERNAME" --password-stdin < "$KALISIO_DOCKERHUB_PASSWORD"
# DOCKER_BUILDKIT is here to be able to use Dockerfile specific dockerginore (app.Dockerfile.dockerignore)
DOCKER_BUILDKIT=1 docker build \
    --build-arg APP="$APP" \
    --build-arg FLAVOR="$FLAVOR" \
    --build-arg BUILD_NUMBER=1 \
    -f app.Dockerfile \
    -t "$IMAGE_NAME:$IMAGE_TAG" \
    "$WORKSPACE_DIR"
docker tag "$IMAGE_NAME:$IMAGE_TAG" "$IMAGE_NAME:$FLAVOR"

if [ "$PUBLISH" = true ]; then
    docker push "$IMAGE_NAME:$IMAGE_TAG"
    docker push "$IMAGE_NAME:$FLAVOR"
fi

docker logout
