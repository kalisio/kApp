# Testing your app

As based on the [KDK](https://kalisio.github.io/kdk/guides/development/test.html), The **kApp** relies on the [Mocha](https://mochajs.org/) testing framework and the [Chai](https://www.chaijs.com/) assertion library. 

## API

From the root folder run the server-side tests: 

::: warning 
To run the server-side tests, the server must not be running.
::: 

```bash
$yarn test:server
```

This will lint and fix issues in the code according to [JS standard](https://github.com/feross/standard), then execute tests using [Mocha](https://mochajs.org/) and compute code coverage using [c8](https://github.com/bcoe/c8).

From the backend `api` folder you can also run the server-side tests like for modules: 

```bash
# with lint/coverage
$yarn test
# without lint/coverage
$yarn mocha
```

## Client

From the root folder run the client-side tests: 

::: warning 
To run the client-side tests, you must first [run the web app](./develop.md#web-app).
::: 

```bash
$yarn test:client
```

This will execute tests using [Mocha](https://mochajs.org/)/[Puppeteer](https://github.com/puppeteer/puppeteer) and compute code coverage using [c8](https://github.com/bcoe/c8).

:::tip
By default the tests will assume that youy web app run on the default `8080` port or the one provided through the `CLIENT_PORT` environment variable.
If a [deployment flavor](./deploy.md#deployment-flavors) is defined it will target the application domain defined as `https://${appName}.${process.env.SUBDOMAIN}`.
:::

From the root folder you can also run the client-side tests without coverage like for the API: 

```bash
$yarn mocha
```

:::tip
If you need to run some specific tests suite only, you can use the `-g` or `--grep` option of the `mocha` command:

```bash
$yarn mocha -g "suite:groups" # run the groups tests
```
:::

Some tests, notably involving web mapping, might rely on screenshots comparison, as a consequence the tests can be run in different modes:
* `preview` mode to only run tests without comparing to reference screenshots, useful when tweaking the test
* `run` mode to run tests by comparing to reference screenshots, useful to perform non-regression testing (default mode)
* `record` mode to run tests and update reference screenshots, useful to save reference images just before releasing

:::tip
You can use the `TEST_MODE` environment variable to change the test mode.
:::

### Writing client tests

In addition to **Mocha** and **Chai** helpers, the **KDK** provides helper functions to test your UI using [Puppeteer](https://github.com/puppeteer/puppeteer):
* test your UI components: the **Runner class** allows you to manage a **Puppereer** browser as well as the default page attached to this browser. In addition, it provides a useful inteface to override permissions, set items in local storage, catch warnings and error messages from the console, take screenshots and compare them to some reference images. 

* deal with your app's API: the **Api class** allows you to access the differents services exposed by the API.

* structure your project test structure: the **KDK** assumes that a directory has been assigned to each **test suite** in order to store test data. These directories, are stored in a more general `data` directory and must be named with the **test suite** name. If you have any screenshot references then then they must stored in a decidacted sub directory named `screenrefs`.

```bash
test
|_ data 
|   |_ suite#1
|   |_ suite#2
|       |_ screenrefs
|   |_ suite#3
|       |_ screenrefs
|_ suite1.test.js
|_ suite2.test.js
|_ suite3.test.js
```

When running the test data are generally generated in order to be compared to the static test data. The **Runner** creates a `run` directory where it stores for the browser (e.g. chrome, firefox) the data for each **test suite**. For instance:

```bash
test
|_run
|   |_ chrome
|       |_ suite#1
|       |_ suite#2
|       |_ suite#3
```

::: tip 
The **Runner** clears its corresponding **test suite** run directory each time you run it.
::: 

#### Core

##### Runner

In pratice, a **Runner** instance has to be created in each **test suite**. You should declare the **Runner** in the **before** hook as well as starting it. Starting the **Runner** creates the **Puppeteer Browser** and open the default page. Obviously, you should stop the **Runner** which causes the Puppeteer Browser to be closed in the **after** hook.

```js
import { core } from '@kalisio/kdk/test.client'

const suite = 'my-suite'

describe(suite, () => {
  let runner
  let page

  before(async () => {
    runner = new core.Runner(suite, { browser: { args: ['--lang=fr'] })
    page = await runner.start()
  })

  it('my-test', async () => {
    ....
  })

  after(async () => {
    await runner.stop()
  })
})
```

A lot of options can be passed to the runner and some defaults provided using environment variables:
```js
{
  // computed by default as explained in the previous section
  baseUrl: 'https://my.domain.com',
  browser: { // Puppeteer browser options
    // defaults to chrome or use BROWSER env var
    product: 'chrome',
    // defaults to false or use HEADLESS env var
    headless: true,
    // default to true if NODE_ENV env var equals 'development'
    devtools: true,
    defaultViewport: {
      width: 1280, // defaults to 1024 or use VIEWPORT_WIDTH env var
      height: 1024 // defaults to 768 or use VIEWPORT_HEIGHT env var
    },
    // defaults to [] or use BROWSER_ARGS env var split as comma separated list of arguments
    args: ['--lang=fr']
  },
  // defaults directories
  dataDir: './test/data',
  runDir: './test/run',
  screenrefsDir: './test/data/screenrefs',
  screenshotsDir: './test/data/screenshots',
  // defaults to run or use TEST_MODE env var
  mode: 'record',
  // defaults to false, enable to save difference images
  writeDiffs: true,
  // defaults to 0.1, increase/decrease to allow more/less tolerance when comparing screenshots
  matchTreshold: 0.2,
  // Accuracy might be required to get some desired behaviours
  geolocation: {
    accuracy: 1000 // in meters, defaults to 500
  }
}
```

The runner provides you with utility function to create and compare screenshots:
```js
// Create a screenshot with an optional clip zone
runner.capture (screenshot_name, boundingBox)
// Create a screenshot and compare with reference screenshot with an optional tolerance and clip zone
runner.captureAndMatch (screenshot_name, diffTolerance, boundingBox)
// Compare two screenshot with an optional tolerance
runner.compareCaptures (screenshot_name1, screenshot_name2, threshold)
```

##### Api

In order to speedup testing and avoid to manually create all the required resources manually in your test, this class provides you functions to automatically create/remove:
* users
* organisations
* groups
* tags

For instance, the following code will setup a complete organisation with members for you:
```js
const org = {
  owner: {
    name: 'Owner',
    email: 'owner@kalisio.xyz',
    password: 'xxx'
  },
  members: [{
    name: 'Manager',
    email: 'manager@kalisio.xyz',
    password: 'xxx',
    permissions: 'manager',
    groups: [{ name: 'Group', permissions: 'member' }]
  }],
  groups: [{
    name: 'Group',
    description: 'A group'
  }]
}

before(async function () {
  ...
  // Prepare structure for current run
  api = new core.Api({
    appName: 'crisis'
  })
  client = api.createClient()
  runner = new core.Runner(suite, { ... })
  await client.createOrganisation(org)
  await client.createMembers(org)
  await client.createGroups(org)
  await client.tagMembers(org)
  await client.groupMembers(org)
  page = await runner.start()
})
```

::: tip 
The **Api** class is useful to clear required resources in case your test fail.
:::

For instance, the following code will clear the previously created complete organisation for you:
```js
after(async function () {
  await runner.stop()
  // First remove groups in case removal test failed
  await client.removeGroups(org)
  // Then members
  await client.removeMembers(org)
  // Then organisation/owner
  await client.removeOrganisation(org)
})
```

##### Utility functions

Explore the various utilities located in [`kdk/test/client`](https://github.com/kalisio/kdk/tree/master/test/client) that will be helpful to manage:
* the application layout
* the items of a collection
* the account and login screens
* the map catalog and controls
