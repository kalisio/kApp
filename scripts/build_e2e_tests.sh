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
        p) # define to publish built container to registry
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

load_env_files "$WORKSPACE_DIR/development/common/kalisio_harbor.enc.env" "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
load_value_files "$WORKSPACE_DIR/development/common/KALISIO_HARBOR_PASSWORD.enc.value"

## Build container
##

# kli file is used in container to install, link
KLI_FILE=$(get_app_kli_file)
cp "$KLI_FILE" "$WORKSPACE_DIR/kli.js"

echo "Will use kli file $KLI_FILE to install and link modules ..."

IMAGE_NAME="$KALISIO_HARBOR_URL/kalisio/$APP-e2e-tests"
IMAGE_TAG="$VERSION-$FLAVOR"

begin_group "Building container ..."

docker login --username "$KALISIO_HARBOR_USERNAME" --password-stdin "$KALISIO_HARBOR_URL" < "$KALISIO_HARBOR_PASSWORD"
# DOCKER_BUILDKIT is here to be able to use Dockerfile specific dockerginore (e2e-tests.Dockerfile.dockerignore)
DOCKER_BUILDKIT=1 docker build \
    --build-arg APP="$APP" \
    --build-arg NODE_APP_INSTANCE="$FLAVOR" \
    --build-arg SUBDOMAIN="$FLAVOR.kalisio.xyz" \
    --build-arg HEADLESS=true \
    --build-arg SLACK_WEBHOOK_APPS="$SLACK_WEBHOOK_APPS" \
    -f e2e-tests.Dockerfile \
    -t "$IMAGE_NAME:$IMAGE_TAG" \
    "$WORKSPACE_DIR"
docker tag "$IMAGE_NAME:$IMAGE_TAG" "$IMAGE_NAME:$FLAVOR"

if [ "$PUBLISH" = true ]; then
    docker push "$IMAGE_NAME:$IMAGE_TAG"
    docker push "$IMAGE_NAME:$FLAVOR"
fi

docker logout "$KALISIO_HARBOR_URL"

end_group "Building container ..."
