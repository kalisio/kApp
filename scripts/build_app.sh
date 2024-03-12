#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_DIR=$(dirname "$THIS_FILE")
ROOT_DIR=$(dirname "$THIS_DIR")

. "$THIS_DIR/kash/kash.sh"

init_repo_infos() {
    local REPO_DIR="$1"
    local REPO_NAME="$(basename "$REPO_DIR")"
    cd "$REPO_DIR"
    local REPO_TAG=$(git tag --points-at)
    local REPO_BRANCH=$(git branch --show-current)
    local COMMIT_SHA=$(git rev-parse HEAD)
    local COMMIT_AUTHOR=$(git show -s --pretty=%an)
    local COMMIT_EMAIL=$(git show -s --pretty=%ae)
    local COMMIT_MESSAGE=$(git show -s --pretty=%B)
    cd ~-

    REPO_INFOS=("$REPO_NAME" "$REPO_TAG" "$REPO_BRANCH" "$COMMIT_SHA" "$COMMIT_AUTHOR" "$COMMIT_EMAIL" "$COMMIT_MESSAGE")
}

init_ci_infos() {
    local JOB_URL
    local REPO_URL
    case "$CI_ID" in
        github)
            REPO_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/commit/"
            JOB_NAME="$GITHUB_WORKFLOW"
            JOB_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/actions/runs/$GITHUB_RUN_ID"
            ;;
        travis)
            REPO_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/commit/"
            JOB_NAME="$TRAVIS_JOB_NAME"
            JOB_URL="$TRAVIS_JOB_WEB_URL"
            ;;
        gitlab)
            REPO_URL="$GITHUB_SERVER_URL/$GITHUB_REPOSITORY/commit/"
            JOB_NAME="$FOO"
            JOB_URL="$TRAVIS_JOB_WEB_URL"
            ;;
        *)
            REPO_URL="http://github.com/kalisio/kapp/commit/"
            JOB_NAME="Build app"
            JOB_URL="http://github.com/kalisio/kapp/actions/runs/8249597899"
            ;;
    esac

    CI_INFOS=("$REPO_URL" "$JOB_NAME" "$JOB_URL")
}

slack_ci_report() {
    local REPO_DIR="$1"
    local RET_CODE="$2"
    local SLACK_WEBHOOK="$3"
    local STATUS="success"
    local COLOR="#2eb886"
    if [ "$RET_CODE" != "0" ]; then STATUS="failed"; COLOR="#a30200"; fi
    local MESSAGE

    init_repo_infos "$REPO_DIR"
    init_ci_infos

    local COMMIT_URL="${CI_INFOS[0]}/${REPO_INFOS[3]}"
    local REPO_REF="${REPO_INFOS[1]}"
    if [ "$REPO_REF" = "" ]; then REPO_REF="${REPO_INFOS[2]}"; fi
    MESSAGE=$(printf "[%s@%s] <%s|%s> %s (%s, <%s|%s>)" "${REPO_INFOS[0]}" "$REPO_REF" "${CI_INFOS[2]}" "${CI_INFOS[1]}" "$STATUS" "${REPO_INFOS[4]}" "$COMMIT_URL" "${REPO_INFOS[3]}")
    slack_color_log "$SLACK_WEBHOOK" "$MESSAGE" "$COLOR"
}

## Parse options
##

PUBLISH=false
while getopts "pr" option; do
    case $option in
        p) # defines mongo version
            PUBLISH=true;;
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

echo "About to build ${APP} v${VERSION}-$FLAVOR ..."

load_env_files "$WORKSPACE_DIR/development/common/kalisio_dockerhub.enc.env" "$WORKSPACE_DIR/development/common/SLACK_WEBHOOK_APPS.enc.env"
load_value_files "$WORKSPACE_DIR/development/common/KALISIO_DOCKERHUB_PASSWORD.enc.value"

## Build container
##

# kli file is used in container to install, link
KLI_FILE=$(get_app_kli_file)
cp "$KLI_FILE" "$WORKSPACE_DIR/kli.js"

echo "Will use kli file $KLI_FILE to install and link modules ..."

IMAGE_NAME="kalisio/$APP"
IMAGE_TAG="$VERSION-$FLAVOR"

begin_group "Building container ..."

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

end_group "Building container ..."
