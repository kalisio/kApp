import{_ as t,o as e,c as o,Q as r}from"./chunks/framework.d2db4bec.js";const h=JSON.parse('{"title":"Configuring a kApp","description":"","frontmatter":{},"headers":[],"relativePath":"reference/configuration.md","filePath":"reference/configuration.md"}'),i={name:"reference/configuration.md"},n=r('<h1 id="configuring-a-kapp" tabindex="-1">Configuring a kApp <a class="header-anchor" href="#configuring-a-kapp" aria-label="Permalink to &quot;Configuring a kApp&quot;">​</a></h1><h2 id="backend-side" tabindex="-1">Backend side <a class="header-anchor" href="#backend-side" aria-label="Permalink to &quot;Backend side&quot;">​</a></h2><p>kApp backend configuration is based on <a href="https://docs.feathersjs.com/guides/advanced/configuration.html" target="_blank" rel="noreferrer">Feathers</a> so the same guidelines are applicable, the default configuration can be found in the <code>api/config</code> folder. The main properties are the following:</p><ul><li><strong>apiPath</strong>: the API path prefix</li><li><strong>port</strong>: the server port</li><li><strong>domain</strong>: the web application domain name (eg <a href="https://app.kalisio.xyz" target="_blank" rel="noreferrer">https://app.kalisio.xyz</a>)</li><li><strong>apiLimiter</strong>: the API rate limiting configuration <ul><li><strong>http</strong>: for HTTP REST clients, compliant with <a href="https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fnfriedly%2Fexpress-rate-limit" target="_blank" rel="noreferrer">express-rate-limit</a> options</li><li><strong>websocket</strong>: for Websocket clients, compliant with <a href="https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fjhurliman%2Fnode-rate-limiter" target="_blank" rel="noreferrer">node-rate-limiter</a> options</li></ul></li><li><strong>authentication</strong> : object configuring <a href="https://github.com/feathersjs/feathers-authentication#default-options" target="_blank" rel="noreferrer">Feathers authentication</a> plus custom options <ul><li><strong>passwordPolicy</strong>: password policy configuration <ul><li><strong>minLength</strong>: minimum length</li><li><strong>maxLength</strong>: maximum length</li><li><strong>uppercase</strong>: boolean indicating if the password requires at least an uppercase letter</li><li><strong>lowercase</strong>: boolean indicating if the password requires at least an uppercase letter</li><li><strong>digits</strong>: boolean indicating if the password requires at least a digit</li><li><strong>symbols</strong>: boolean indicating if the password requires at least a symbol</li><li><strong>prohibited</strong>: array of prohibited common passwords</li><li><strong>history</strong>: number of passwords to look for in history to avoid keeping a similar one when changing</li></ul></li><li><strong>defaultUsers</strong>: the array of default users to be created on launch (format <code>{ email, password }</code>) <ul><li>note: will not be exposed on staging/production environments for security concerns</li></ul></li><li><strong>limiter</strong>: the authentication API rate limiting configuration <ul><li><strong>http</strong>: for HTTP REST clients, compliant with <a href="https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fnfriedly%2Fexpress-rate-limit" target="_blank" rel="noreferrer">express-rate-limit</a> options</li><li><strong>websocket</strong>: for Websocket clients, compliant with <a href="https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fjhurliman%2Fnode-rate-limiter" target="_blank" rel="noreferrer">node-rate-limiter</a> options</li></ul></li></ul></li><li><strong>logs</strong>: object configuring the <a href="https://github.com/winstonjs/winston" target="_blank" rel="noreferrer">winston</a> loggers to be used - each key is a <a href="https://github.com/winstonjs/winston/blob/master/docs/transports.md" target="_blank" rel="noreferrer">transport name</a> which value is associated configuration options</li><li><strong>db</strong>: database configuration <ul><li><strong>adapter</strong>: the database adapter, for now the only supported one is <a href="https://github.com/feathersjs/feathers-mongodb" target="_blank" rel="noreferrer"><code>mongodb</code></a></li><li><strong>url</strong>: database URL to access the app database used by drivers such as <a href="https://github.com/mongodb/node-mongodb-native" target="_blank" rel="noreferrer">mongodb</a></li></ul></li><li><strong>storage</strong>: storage service configuration used by <a href="https://kalisio.github.io/kdk/api/core/services.html#storage-service" target="_blank" rel="noreferrer">core</a><ul><li><strong>accessKeyId</strong>: AWS S3 access key</li><li><strong>secretAccessKey</strong>: AWS S3 secret access key</li><li><strong>bucket</strong>: AWS S3 bucket to be used</li></ul></li><li><strong>mailer</strong>: <a href="https://kalisio.github.io/kdk/api/core/services.html#mailer-service" target="_blank" rel="noreferrer">e-mail service</a> configuration, compliant with <a href="https://github.com/nodemailer/nodemailer-smtp-transport" target="_blank" rel="noreferrer">nodemailer</a> options plus custom Kalisio options, e.g. <ul><li><strong>service</strong>: e-mail service to be used (like <code>gmail</code>)</li><li><strong>auth</strong>: user login and password</li><li><strong>templateDir</strong>: directory containing the e-mails templates to be used</li></ul></li><li><strong>pusher</strong>: <a href="https://kalisio.github.io/kdk/api/core/services.html#pusher-service" target="_blank" rel="noreferrer">push notification service</a> configuration <ul><li><strong>accessKeyId</strong>: AWS SNS access key</li><li><strong>secretAccessKey</strong>: AWS SNS secret access key</li><li><strong>region</strong>: AWS region to be used (like <code>eu-west-1</code>)</li><li><strong>apiVersion</strong>: AWS API version to be used (like <code>2010-03-31</code>)</li><li><strong>platforms</strong>: object containing as keys platforms names in uppercase (like <code>ANDROID</code>) and corresponding AWS SNS ARN as values</li></ul></li><li><strong>proxyTable</strong>: a set of proxy rules typically used for <a href="https://kalisio.github.io/kdk/architecture/global-architecture.html#architecture-at-scale" target="_blank" rel="noreferrer">scaling</a></li></ul><p>Environment variables (will override defaults in config file):</p><ul><li><strong>PORT / HTTPS_PORT</strong>: backend port for HTTP and HTTPS modes</li><li><strong>CLIENT_PORT / HTTPS_CLIENT_PORT</strong>: frontend port for HTTP and HTTPS modes (only used in development)</li><li><strong>DB_URL</strong>: database URL to access the app database</li></ul><h2 id="frontend-side" tabindex="-1">Frontend side <a class="header-anchor" href="#frontend-side" aria-label="Permalink to &quot;Frontend side&quot;">​</a></h2><p>kApp frontend configuration is based on the same underlying <a href="https://github.com/lorenwest/node-config" target="_blank" rel="noreferrer">tool</a> that powers <a href="https://docs.feathersjs.com/guides/advanced/configuration.html" target="_blank" rel="noreferrer">Feathers</a> so the same guidelines are applicable, the default configuration can be found in the <code>config</code> folder. The main properties are the following:</p><ul><li><strong>apiPath</strong>: the API path prefix</li><li><strong>apiTimeout</strong>: the API timeout</li><li><strong>apiJwt</strong>: name of the local storage key used to store the JWT used by the internal API</li><li><strong>gatewayJwt</strong>: name of the local storage key used to store the JWT used by the API gateway</li><li><strong>version</strong>: the web application version number</li><li><strong>flavor</strong>: the web application <a href="https://kalisio.github.io/kdk/guides/development/deploy.html#deployment-flavors" target="_blank" rel="noreferrer">flavor</a></li><li><strong>domain</strong>: the web application domain name (eg <a href="https://kapp.dev.kalisio.xyz" target="_blank" rel="noreferrer">https://kapp.dev.kalisio.xyz</a>)</li><li><strong>gateway</strong>: the API gateway domain name (eg <a href="https://api.dev.kalisio.xyz" target="_blank" rel="noreferrer">https://api.dev.kalisio.xyz</a>)</li><li><strong>transport</strong> : the transport to be used between frontend and backend, could be <code>http</code> for standard REST or <code>websocket</code> for WebSockets</li><li><strong>appName</strong>: the name of the app</li><li><strong>appLogo</strong>: the image to be used as logo for the app</li><li><strong>theme</strong>: the <a href="./../../api/core/application.html#theme">theme</a> to be used</li><li><strong>logs</strong><ul><li><strong>level</strong>: <a href="https://github.com/pimterry/loglevel#documentation" target="_blank" rel="noreferrer">log level</a> to be used</li></ul></li><li><strong>screens</strong>: connection screens configuration <ul><li><strong>extraLinks</strong>: extra links displayed at the bottom of all screens,</li><li><strong>banner</strong>: displayed application banner,</li><li><strong>login</strong>: login screen configuration <ul><li><strong>providers</strong>: array of OAuth2 providers to be used (like <code>[&#39;google&#39;, &#39;github&#39;]</code>),</li><li><strong>links</strong>: links displayed at the bottom of the screen,</li></ul></li><li><strong>logout</strong>: logout screen configuration <ul><li><strong>links</strong>: links displayed at the bottom of the screen,</li></ul></li><li><strong>changeEndpoint</strong>: change endpoint screen configuration (only useful for mobile apps) <ul><li><strong>links</strong>: links displayed at the bottom of the screen,</li></ul></li></ul></li><li><strong>layout</strong>: layout configuration, see <a href="https://quasar.dev/layout/layout" target="_blank" rel="noreferrer">Quasar docs</a> for details</li><li><strong>myActivity</strong>: configuration of the activity named <code>my-activity</code> in the application <ul><li><strong>topPane</strong>: application bar components configuration for this activity <ul><li><strong>content</strong>: list of components to be displayed according to current mode of the activity (if any),</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>leftPane</strong>: left pane (i.e. main menu) components configuration for this activity <ul><li><strong>content</strong>: list of components to be displayed according to current mode of the activity (if any),</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>bottomPane</strong>: bottom pane components configuration for this activity <ul><li><strong>content</strong>: list of components to be displayed according to current mode of the activity (if any),</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>rightPane</strong>: right pane components configuration for this activity <ul><li><strong>content</strong>: list of components to be displayed according to current mode of the activity (if any),</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>page</strong>: additional page components configuration for this activity <ul><li><strong>content</strong>: list of components to be displayed according to current mode of the activity (if any),</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>window</strong>: window (i.e. widgets) configuration for this activity <ul><li><strong>widgets</strong>: list of widgets to be displayed,</li><li><strong>filter</strong>: component filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a>,</li></ul></li><li><strong>fab</strong>: floating action button (FAB) configuration for this activity <ul><li><strong>actions</strong>: list of actions to be displayed,</li><li><strong>filter</strong>: action filter using any expression supported by <a href="https://github.com/crcn/sift.js" target="_blank" rel="noreferrer">sift</a></li></ul></li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>The main difference with the backend configuration is that the actual frontend configuration is generated by WebPack at build time from the config files, so you will need to rebuild the app to see your changes applied</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Althought we use JS objects en environment variables in the frontend configuration to ease writing it please note that the resulting configuration file will be a static JSON file so don&#39;t store complex JS objects like functions in the config as it will not work</p></div><p>Environment variables for the frontend development server (will override defaults):</p><ul><li><strong>PORT / HTTPS_PORT</strong>: backend port for HTTP and HTTPS modes (used to configure proxy)</li><li><strong>CLIENT_PORT / HTTPS_CLIENT_PORT</strong>: frontend port for HTTP and HTTPS modes</li></ul>',13),s=[n];function a(l,g,c,p,d,u){return e(),o("div",null,s)}const m=t(i,[["render",a]]);export{h as __pageData,m as default};