#!/usr/bin/env bash
set -euo pipefail
# set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/kash/kash.sh"

PUBLISH=false
while getopts "p" option; do
    case $option in
        p) # defines mongo version
            PUBLISH=true;;
        *)
            ;;
    esac
done

# Build process requires node 18
use_node 18

rm .postcssrc.js && cd docs && yarn install && yarn build

if [ "$PUBLISH" = true ]; then
    # deploy_gh_pages
    echo "publish !"
fi
