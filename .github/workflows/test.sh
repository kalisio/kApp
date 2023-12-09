echo "Running tests"

#
# Provision the required files
#
chmod +x ./.github/workflows/env.sh
./.github/workflows/env.sh

#
# Run backend tests
#
cd api
yarn test
