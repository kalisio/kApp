# Publish your app

## Prerequisites

### Install Change log generator

In order to be able to generate the changelog for your published app/modules you need this [gem](https://github.com/skywinder/github-changelog-generator), which creates a log file based on **tags**, **issues** and merged **pull requests** (and splits them into separate lists according to labels) from :octocat: GitHub Issue Tracker. This requires you to install (e.g. for Windows) [Ruby](http://rubyinstaller.org/downloads/) and its [DevKit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit).

## Web app

In a nutshell, the tasks are performed manually and independently using the required commands at the different stages of the application lifecycle to be published in the Docker Hub.

In order to change the version number in a web app you have to increase the package version number in the **package.json** file (frontend and backend API), and possibly Cordova configuration file, of your branch so that the generated artefacts will not erase previously published ones. Depending on the release typing the following command will do the job (where type is either `patch`, `minor`, `major`):
```bash
npm run release:type
```

Usually, you start a new version by creating a `test` (a.k.a release or staging) branch from your `master` branch. You should then increase the version number (major or minor) of your `master` branch so that the generated artefacts of the new development version will not erase previously published ones, e.g. `npm run release:major`.

When you are satisfied enough with your version you typically release it starting from your `test` (a.k.a release or staging) branch:
1. create a tag accordingly in the git repository and push it,
2. generates the changelog in the git repository and push it

This process usually triggers your [CI/CD](./deploy.md) process to build the target artefacts.

::: warning
Before you publish your app take care of updating the version of all dependent modules to the latest version published, for example perform `yarn upgrade kdk` to use the latest versin of the KDK.
:::

::: warning
If you are using our [CLI](../../tools/cli.md#kdk-cli) take care of updating/creating the required workspace file before you publish your app.
:::

Then, you should then increase the version patch number of your `test` branch so that the generated artefacts of the new staging version will not erase previously published ones, e.g. `npm run release:patch`. Indeed, a staging branch should only include patch versions not major/minor versions.

### Manual build

Because Kalisio web app are also released as Docker images you can build it like this:
```bash
docker build -t kalisio/kapp .
```
Then release it as latest version:
```bash
docker login
docker push kalisio/kapp
```
And tag it (`version_tag` being the current version number like `1.1.2-prod` or `1.1.0-dev` depending on the [flavor](./deploy.md))
```bash
docker tag kalisio/kapp kalisio/kapp:version_tag
docker push kalisio/kapp:version_tag
```

::: warning
This requires you to have a DockerHub account and be a team member of the Kalisio organization, if you'd like to become a maintainer please tell us
:::
