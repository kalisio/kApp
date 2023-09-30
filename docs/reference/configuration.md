# Configuring a kApp

## Backend side

kApp backend configuration is based on [Feathers](https://docs.feathersjs.com/guides/advanced/configuration.html) so the same guidelines are applicable, the default configuration can be found in the `api/config` folder. The main properties are the following:
* **apiPath**: the API path prefix
* **port**: the server port
* **domain**: the web application domain name (eg https://app.kalisio.xyz)
* **apiLimiter**: the API rate limiting configuration
  * **http**: for HTTP REST clients, compliant with [express-rate-limit](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fnfriedly%2Fexpress-rate-limit) options
  * **websocket**: for Websocket clients, compliant with [node-rate-limiter](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fjhurliman%2Fnode-rate-limiter) options
* **authentication** : object configuring [Feathers authentication](https://github.com/feathersjs/feathers-authentication#default-options) plus custom options
  * **passwordPolicy**: password policy configuration
    * **minLength**: minimum length
    * **maxLength**: maximum length
    * **uppercase**: boolean indicating if the password requires at least an uppercase letter
    * **lowercase**: boolean indicating if the password requires at least an uppercase letter
    * **digits**: boolean indicating if the password requires at least a digit
    * **symbols**: boolean indicating if the password requires at least a symbol
    * **prohibited**: array of prohibited common passwords
    * **history**: number of passwords to look for in history to avoid keeping a similar one when changing
  * **defaultUsers**: the array of default users to be created on launch (format `{ email, password }`)
    * note: will not be exposed on staging/production environments for security concerns
  * **limiter**: the authentication API rate limiting configuration
    * **http**: for HTTP REST clients, compliant with [express-rate-limit](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fnfriedly%2Fexpress-rate-limit) options
    * **websocket**: for Websocket clients, compliant with [node-rate-limiter](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fjhurliman%2Fnode-rate-limiter) options
* **logs**: object configuring the [winston](https://github.com/winstonjs/winston) loggers to be used - each key is a [transport name](https://github.com/winstonjs/winston/blob/master/docs/transports.md) which value is associated configuration options
* **db**: database configuration
  * **adapter**: the database adapter, for now the only supported one is [`mongodb`](https://github.com/feathersjs/feathers-mongodb)
  * **url**: database URL to access the app database used by drivers such as [mongodb](https://github.com/mongodb/node-mongodb-native)
* **storage**: storage service configuration used by [core](https://kalisio.github.io/kdk/api/core/services.html#storage-service)
  * **accessKeyId**: AWS S3 access key
  * **secretAccessKey**: AWS S3 secret access key
  * **bucket**: AWS S3 bucket to be used
* **mailer**: [e-mail service](https://kalisio.github.io/kdk/api/core/services.html#mailer-service) configuration, compliant with [nodemailer](https://github.com/nodemailer/nodemailer-smtp-transport) options plus custom Kalisio options, e.g.
  * **service**: e-mail service to be used (like `gmail`)
  * **auth**: user login and password
  * **templateDir**: directory containing the e-mails templates to be used
* **push**: [feathers-webpush](https://github.com/kalisio/feathers-webpush) configuration
  * **subject**: VAPID server contact information
  * **publicKey**: VAPID public key.
  * **privateKey**: VAPID private key
* **proxyTable**: a set of proxy rules typically used for [scaling](https://kalisio.github.io/kdk/architecture/global-architecture.html#architecture-at-scale)

Environment variables (will override defaults in config file):
* **PORT / HTTPS_PORT**: backend port for HTTP and HTTPS modes
* **CLIENT_PORT / HTTPS_CLIENT_PORT**: frontend port for HTTP and HTTPS modes (only used in development)
* **DB_URL**: database URL to access the app database

## Frontend side

kApp frontend configuration is based on the same underlying [tool](https://github.com/lorenwest/node-config) that powers [Feathers](https://docs.feathersjs.com/guides/advanced/configuration.html) so the same guidelines are applicable, the default configuration can be found in the `config` folder. The main properties are the following:
* **apiPath**: the API path prefix
* **apiTimeout**: the API timeout
* **apiJwt**: name of the local storage key used to store the JWT used by the internal API
* **gatewayJwt**: name of the local storage key used to store the JWT used by the API gateway
* **version**: the web application version number
* **flavor**: the web application [flavor](https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors)
* **domain**: the web application domain name (eg https://kapp.dev.kalisio.xyz)
* **gateway**: the API gateway domain name (eg https://api.dev.kalisio.xyz)
* **transport** : the transport to be used between frontend and backend, could be `http` for standard REST or `websocket` for WebSockets
* **appName**: the name of the app
* **appLogo**: the image to be used as logo for the app
* **theme**: the [theme](../../api/core/application.md#theme) to be used
* **logs**
  * **level**: [log level](https://github.com/pimterry/loglevel#documentation) to be used
* **screens**: connection screens configuration
  * **extraLinks**: extra links displayed at the bottom of all screens,
  * **banner**: displayed application banner,
  * **login**: login screen configuration
    * **providers**: array of OAuth2 providers to be used (like `['google', 'github']`),
    * **links**: links displayed at the bottom of the screen,
  * **logout**: logout screen configuration
    * **links**: links displayed at the bottom of the screen,
  * **changeEndpoint**: change endpoint screen configuration (only useful for mobile apps)
    * **links**: links displayed at the bottom of the screen,
* **layout**: layout configuration, see [Quasar docs](https://quasar.dev/layout/layout) for details
* **myActivity**: configuration of the activity named `my-activity` in the application
  * **topPane**: application bar components configuration for this activity
    * **content**: list of components to be displayed according to current mode of the activity (if any),
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **leftPane**: left pane (i.e. main menu) components configuration for this activity
    * **content**: list of components to be displayed according to current mode of the activity (if any),
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **bottomPane**: bottom pane components configuration for this activity
    * **content**: list of components to be displayed according to current mode of the activity (if any),
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **rightPane**: right pane components configuration for this activity
    * **content**: list of components to be displayed according to current mode of the activity (if any),
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **page**: additional page components configuration for this activity
    * **content**: list of components to be displayed according to current mode of the activity (if any),
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **window**: window (i.e. widgets) configuration for this activity
    * **widgets**: list of widgets to be displayed,
    * **filter**: component filter using any expression supported by [sift](https://github.com/crcn/sift.js),
  * **fab**: floating action button (FAB) configuration for this activity
    * **actions**: list of actions to be displayed,
    * **filter**: action filter using any expression supported by [sift](https://github.com/crcn/sift.js)

::: tip 
The main difference with the backend configuration is that the actual frontend configuration is generated by WebPack at build time from the config files, so you will need to rebuild the app to see your changes applied
::: 

::: warning 
Althought we use JS objects en environment variables in the frontend configuration to ease writing it please note that the resulting configuration file will be a static JSON file so don't store complex JS objects like functions in the config as it will not work
::: 

Environment variables for the frontend development server (will override defaults):
* **PORT / HTTPS_PORT**: backend port for HTTP and HTTPS modes (used to configure proxy)
* **CLIENT_PORT / HTTPS_CLIENT_PORT**: frontend port for HTTP and HTTPS modes