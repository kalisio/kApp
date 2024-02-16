#!/usr/bin/env bash
set -euo pipefail
set -x

THIS_FILE=$(readlink -f "${BASH_SOURCE[0]}")
THIS_PATH=$(dirname "$THIS_FILE")
ROOT_PATH=$(dirname "$THIS_PATH")

. "$THIS_PATH/lib.sh"

VENV_BRANCH=
VENV_TAG=
VENV_NODE=
while getopts "b:n:t:" option; do
    case $option in
        b) # defines branch
            VENV_BRANCH=$OPTARG;;
        n) # defines node version
            VENV_NODE=$OPTARG;;
        t) # defines venv tag
            VENV_TAG=$OPTARG;;
        *)
        ;;
    esac
done

shift $((OPTIND-1))
VENV_PATH="$1"

KLI_FILE="$KALISIO_DEVELOPMENT_DIR/development/workspaces/apps/kapp/dev/kapp.js"
unset KALISIO_DEVELOPMENT_DIR
run_kli "$VENV_PATH" "$KLI_FILE" "$VENV_NODE"
