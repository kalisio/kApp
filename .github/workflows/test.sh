echo "Running tests"

#
# Provision the required files
#
source ./.github/workflows/env.sh

#
# Run backend tests
#

yarn test:server
