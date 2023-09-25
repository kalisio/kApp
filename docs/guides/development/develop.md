# Develop your app

The **kApp** provides the basic structure and tools to build and run a KDK-based application. We detail the main commands in the following sections.

## Web app

### Running for development

Run the frontend app (from root project folder): `$ yarn dev`

::: tip
Run the frontend app as a **PWA** (from root project folder): `$ yarn pwa:dev`
:::

Then from the backend `api` folder run the server-side app: `$ yarn dev`

Then point your browser to [localhost:8080](http://localhost:8080).

### Building for production

Build the frontend app (from root project folder): `$ yarn build`.

::: tip
Build the frontend app as a **PWA** (from root project folder): `$ yarn pwa:build`
:::

Then from the backend `api` folder build the server-side app: `$ yarn build`

### Running in production

> Make sure you built your app first

From the backend `api` folder run the server-side Feathers app, this will also serve the frontend Quasar app : `$ yarn prod`

Then point your browser to [localhost:8081](http://localhost:8081).

### Linting the code

As the KDK, the kApp relies on [JavaScript standard style](https://github.com/feross/standard).

To lint the code (from root project folder or the backend `api` folder):

```bash
$yarn lint
```

### Debugging

Use [Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27), look at this [tutorial video](https://www.youtube.com/watch?v=Xb_0awoShR8). Usually you simply have to open `chrome://inspect` in the Chrome URL.

If you want to launch a specific test use: `yarn mocha -- --grep "My test"`.

If you want to pause the debugger when running the tests this should do it: `yarn mocha -- --inspect-brk`.

If you want to debug replicas you can use the following environment variables to launch two instances of your apps:
* **PORT / HTTPS_PORT**: API server port for HTTP and HTTPS modes
* **CLIENT_PORT / HTTPS_CLIENT_PORT**: frontend server port for HTTP and HTTPS modes

For the backend run one instance with `$ yarn dev` and the other one with `$ yarn dev:replica` (this will use another port for the Node.js debugger on the second instance and avoid conflict).

Look at this [tutorial](https://washamdev.com/debug-a-website-in-ios-safari-on-windows/) will you need to debug the app in Safari from a Windows developmen environment.

### Remote debugging

Notably useful to debug your app running on a mobile device.

For this you need to [enable remote debug on your Android device](https://developer.chrome.com/docs/devtools/remote-debugging/).

::: warning
For PWA you will need to setup port forwarding so that you can use the same `http:\\localhost:port` adress on your device as on your PC, otherwise you will not be able to install the application.
:::
