# Installing KApp

## Using Docker

::: warning
This requires you to [install Docker](https://docs.docker.com/engine/installation/), the world’s leading software container platform.
:::

We provide Docker images on the [Docker Hub](https://hub.docker.com/r/kalisio/kapp/) to ease deploying your own instance. To run correctly it has to be linked with a standard [MongoDB container](https://hub.docker.com/_/mongo/) for the database. Although it's possible to directly run Docker commands we provide you with [docker-compose](https://docs.docker.com/compose/) file to ease deployment. This file is detailed in the following sections and is available in the [public folder](https://github.com/kalisio/kApp/tree/master/docs/.vuepress/public) of the documentation.

Jump into the folder with the docker-compose file, the following commands should do the job:

```bash
// Retrieve the latest available dev tag
docker pull kalisio/kapp:dev

// Run the MongoDB and KApp containers
docker-compose up -d

// Stop the MongoDB and KApp containers
docker-compose down

// Stop the MongoDB and KApp containers erasing DB data
docker-compose down -v
```

Then point your browser to [localhost:8080](http://localhost:8080).

::: tip
Check the [default.cjs](https://github.com/kalisio/kApp/blob/master/api/config/default.cjs) configuration file to find the required login information
:::

::: warning 
If running Docker under Windows in a virtual machine first redirect the port 8080 of your virtual machine to your host
::: 

::: details docker-compose.yml - Used to deploy MongoDB and KApp containers.
<<< @/.vuepress/public/docker-compose.yml
:::

::: tip
For most applications some secrets (like your AWS S3 access key) need also to be set in your environment to make it work, see [deployment prerequisites](https://kalisio.github.io/kdk/guides/development/deploy.html)
::: 

## From source code

First you have to ensure the [KDK prerequisites](https://kalisio.github.io/kdk/guides/development/setup.html#prerequisites) to run kApp from source code. Then the following commands, assuming you have a MongoDB instance running on local host and default port (27017), should launch your local instance of KApp:

```bash
// Clone KDK
git clone https://github.com/kalisio/kdk.git
cd kdk
yarn install
yarn link

// In another terminal clone KApp
git clone https://github.com/kalisio/kApp.git

// Run the server/API
cd KApp/api
yarn install
yarn link @kalisio/kdk
yarn dev

// In another terminal run the client app
cd KApp
yarn install
yarn link @kalisio/kdk
yarn dev
```

Then point your browser to [localhost:8080](http://localhost:8080).

To start coding into your application please refer to our [development guide](https://kalisio.github.io/kdk/guides/development/develop.html).