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
while getopts "p" option; do
    case $option in
        p) # defines mongo version
            PUBLISH=true
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

echo "About to build ${APP} v${VERSION}-$FLAVOR ..."

load_env_files "$WORKSPACE_DIR/development/common/kalisio_dockerhub.enc.env" "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
load_value_files "$WORKSPACE_DIR/development/common/KALISIO_DOCKERHUB_PASSWORD.enc.value"

## Build container
##

IMAGE_NAME="kalisio/$APP-e2e-tests"
IMAGE_TAG="$VERSION-$FLAVOR"

begin_group "Building container ..."

docker login --username "$KALISIO_DOCKERHUB_USERNAME" --password-stdin < "$KALISIO_DOCKERHUB_PASSWORD"
# DOCKER_BUILDKIT is here to be able to use Dockerfile specific dockerginore (app.Dockerfile.dockerignore)
DOCKER_BUILDKIT=1 docker build \
    --build-arg APP="$APP" \
    --build-arg NODE_APP_INSTANCE="$FLAVOR" \
    --build-arg SUBDOMAIN="$FLAVOR.kalisio.xyz" \
    --build-arg HEADLESS=true \
    -f test.Dockerfile \
    -t "$IMAGE_NAME:$IMAGE_TAG" \
    "$WORKSPACE_DIR"
docker tag "$IMAGE_NAME:$IMAGE_TAG" "$IMAGE_NAME:$FLAVOR"

if [ "$PUBLISH" = true ]; then
    docker push "$IMAGE_NAME:$IMAGE_TAG"
    docker push "$IMAGE_NAME:$FLAVOR"
fi

docker logout

end_group "Building container ..."
