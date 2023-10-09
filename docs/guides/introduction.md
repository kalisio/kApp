# Introduction

The kApp is a demo application created from [skeleton](https://kalisio.github.io/skeleton/). it includes all the necessary boilerplate that you will need to get started building your application:
* [client-side boilerplate](https://quasar.dev/quasar-cli/developing-spa/introduction) in the *root* folder
* [server-side boilerplate](https://docs.feathersjs.com/guides/basics/generator.html) in the *api* folder
* [continuous integration/deployment boilerplate](https://kalisio.github.io/skeleton/development/setup.html) in the *root* folder as Dockerfiles and Travis CI scripts

It also includes the minimum viable set of features to start:
* a [basic application layout](https://kalisio.github.io/kdk/api/core/components.html) including side navigation, application bar, right panel and various widgets
* ready-to-go [user authentication services](https://kalisio.github.io/kdk/api/core/services.html#users-service) and [screens](https://kalisio.github.io/kdk/api/core/components.html#authentication),
* a [basic service](https://kalisio.github.io/kdk/api/core/application.html) to create/remove documents in database,
* a [basic collection activity](https://kalisio.github.io/kdk/api/core/mixins.html) listing documents using either [a list, a grid or a table](https://kalisio.github.io/kdk/api/core/components.html#collections),
* a [basic editor](https://kalisio.github.io/kdk/api/core/components.html#editors) to fill document properties when creating a new document.

## Infrastructure

The setup of application infrastructures is typically powered by our [kaabah](https://github.com/kalisio/kaabah) project while application deployment is typically powered by our [kargo](https://github.com/kalisio/kargo) project.
