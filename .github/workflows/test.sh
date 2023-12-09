echo "Running tests"

source ./env.sh

# Run backend tests
cd api
yarn
yarn test
