# Installing kApp

## Using Docker

::: warning
This requires you to [install Docker](https://docs.docker.com/engine/installation/), the world’s leading software container platform.
:::

We provide Docker images on the [Docker Hub](https://hub.docker.com/r/kalisio/kapp/) to ease deploying your own instance. To run correctly it has to be linked with a standard [MongoDB container](https://hub.docker.com/_/mongo/) for the database. Although it's possible to directly run Docker commands we provide you with [docker-compose](https://docs.docker.com/compose/) file to ease deployment. This file is detailed in the following sections and is available in the [public folder](https://github.com/kalisio/kApp/tree/master/docs/public) of the documentation.

Jump into the folder with the docker-compose file, the following commands should do the job:

```bash
// Retrieve the latest available dev tag
docker pull kalisio/kapp:dev

// Run the MongoDB and kApp containers
docker-compose up -d

// Stop the MongoDB and kApp containers
docker-compose down

// Stop the MongoDB and kApp containers erasing DB data
docker-compose down -v
```

Then point your browser to [localhost:8080](http://localhost:8080).

::: tip
Check the [default.cjs](https://github.com/kalisio/kApp/blob/master/api/config/default.cjs) configuration file to find the required login information
:::

::: warning 
If running Docker under Windows in a virtual machine first redirect the port 8080 of your virtual machine to your host
::: 

::: details docker-compose.yml - Used to deploy MongoDB and kApp containers.
<<< ../.vitepress/public/docker-compose.yml
:::

::: tip
For most applications some secrets (like your AWS S3 access key) need also to be set in your environment to make it work, see [deployment prerequisites](https://kalisio.github.io/kdk/guides/development/deploy.html)
::: 

## From source code

While it is a WIP and not yet pushed to NPM, or when developing, please use the following process.

::: tip
We recommand using our [CLI](https://kalisio.github.io/kdk/tools/cli.html#kdk-cli) but you can still proceed manually as explained below.
:::

First you have to ensure the [KDK prerequisites](https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites) to run kApp from source code. Then the following commands, assuming you have a MongoDB instance running on local host and default port (27017), should launch your local instance of kApp.

Start by cloning all the modules you need and use [yarn/npm link](https://docs.npmjs.com/cli/link) to make them globally available to your Node.js installation:
```bash
// Clone and link KDK
git clone https://github.com/kalisio/kdk.git
cd kdk
yarn install
yarn link
...
```

Then clone the main app repository and link to modules to make Node.js pointing to the previously cloned modules instead of those installed by yarn/npm, e.g. :
```bash
// In another terminal clone and link modules to kApp
git clone https://github.com/kalisio/kApp.git

// Run the server/API
cd kApp/api
yarn install
yarn link @kalisio/kdk
yarn dev

// In another terminal run the client app
cd kApp
yarn install
yarn link @kalisio/kdk
yarn dev
```

Then point your browser to [localhost:8080](http://localhost:8080).

::: warning
Take care that if a top-level module/plugin might depend on another module/plugin you will have to link them together during development, for instance the kdk module depends on the weacast-core module.
:::