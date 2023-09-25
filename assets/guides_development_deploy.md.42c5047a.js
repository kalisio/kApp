import{_ as e,o,c as t,Q as i}from"./chunks/framework.d2db4bec.js";const a="/kApp/assets/cd-pipeline-global.b7ad8cc6.svg",r="/kApp/assets/cd-pipeline-travis.65abc249.svg",s="/kApp/assets/cd-pipeline-env.a32602e7.svg",n="/kApp/assets/kdk-workspace.bde8b599.png",l="/kApp/assets/cd-pipeline-app.678bc170.svg",p="/kApp/assets/cd-pipeline-android.891db84a.svg",d="/kApp/assets/cd-pipeline-ios.ab178a13.svg",A=JSON.parse('{"title":"Deploy your app","description":"","frontmatter":{},"headers":[],"relativePath":"guides/development/deploy.md","filePath":"guides/development/deploy.md"}'),c={name:"guides/development/deploy.md"},h=i('<h1 id="deploy-your-app" tabindex="-1">Deploy your app <a class="header-anchor" href="#deploy-your-app" aria-label="Permalink to &quot;Deploy your app&quot;">​</a></h1><h2 id="deployment-pipeline" tabindex="-1">Deployment pipeline <a class="header-anchor" href="#deployment-pipeline" aria-label="Permalink to &quot;Deployment pipeline&quot;">​</a></h2><p>The main purpose of the continuous integration and deployment (CI/CD) pipeline is to create/build application artifacts (Docker images for the web application and mobile application bundles) and deploy it in production-like environments in order to test/run it. We rely on <a href="https://travis-ci.org" target="_blank" rel="noreferrer">Travis CI</a> for continuous integration and delivery, as such you need to create the CI/CD pipeline in Travis CI by syncing your GitHub repository.</p><p>You can read this <a href="https://medium.com/better-programming/why-we-stopped-using-so-called-best-practices-in-our-ci-cd-process-2ff09811f633" target="_blank" rel="noreferrer">article</a> on Medium to get an overview of our global CI/CD pipeline, which is illustrated in the following schema:</p><p><img src="'+a+'" alt="Global deployment pipeline"></p><p>The different operations performed by each stages are the following:</p><ul><li><strong>APP</strong>: executes the <em>travis.app.sh</em> script to <ul><li>creates the Docker images for the application and testing</li><li>run backend and frontend tests on the target infrastructure</li><li>deploy the web application on the target infrastructure</li></ul></li><li><strong>ANDROID</strong>: executes the <em>travis.android.sh</em> script to <ul><li>build the Android APK</li><li>deploy it to Google Play</li></ul></li><li><strong>IOS</strong>: executes the <em>travis.ios.sh</em> script to <ul><li>build the iOS IPA</li><li>deploy it to App Store Connect</li></ul></li></ul><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can skip any of this stage by adding <code>[skip stage]</code> to your commit message, e.g. <code>[skip android]</code> to skip the Android build</p></div><p>In addition, the <em>travis.env.sh</em> script automatically generates a temporary environment file, based on the secret variables defined in the Travis repository settings or coming from a dedicated private repository (see details hereafter), which is used to <a href="./configure.html">configure the application</a>. The following schema summarizes the different scripts used by the CI/CD:</p><p><img src="'+r+'" alt="Travis scripts"></p><h2 id="deployment-flavors" tabindex="-1">Deployment flavors <a class="header-anchor" href="#deployment-flavors" aria-label="Permalink to &quot;Deployment flavors&quot;">​</a></h2><p>CI/CD comes al well in three different flavors, as defined by the value of the <code>FLAVOR</code>/<code>NODE_APP_INSTANCE</code> environment variables:</p><ul><li><strong>dev</strong>: in order to deploy current development/alpha version, linked to the <code>master</code> branch of your code</li><li><strong>test</strong>: in order to deploy current staging/beta version, usually linked to the <code>test</code> branch of your code, identified by matching the following regular expression pattern <code>^test-*|-test$</code></li><li><strong>prod</strong>: in order to deploy current production version, usually linked to specific <code>tags</code> on the <code>test</code> branch of your code by matching the following regular expression pattern <code>^prod-v[0-9]+\\.[0-9]+\\.[0-9]+</code></li></ul><p>The Docker image artifacts use the prerelease SemVer notation for tags to identify which flavor has been used to produce it — <code>1.0.0-dev</code> for alpha version, <code>1.0.0-test</code> for beta version or <code>1.0.0-prod</code> for production. There is also a shortcut for the latest available version of each flavor: <code>dev</code>, <code>test</code> and <code>prod</code>.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>In the CI/CD process the <code>FLAVOR</code>/<code>NODE_APP_INSTANCE</code> environment variable is automatically set based on the branch/tag you are pushing. During local development these variables are usually not defined.</p></div><p>Starting from the following base application setup:</p><ul><li>a root domain, defined by the value of the <code>DOMAIN</code> environment variable like <code>kalisio.xyz</code></li><li>a version number, defined by the value of the <code>VERSION</code> environment variable like <code>1.3.0</code> and automatically extracted from your <em>package.json</em> file</li><li>a name, defined in the <code>APP</code> environment variable like <code>kApp</code></li></ul><p>Each flavor is then attached to a different target infrastructure, subdomain and version tag:</p><ul><li><strong>dev</strong>: <code>SUBDOMAIN=dev.$DOMAIN</code>, <code>VERSION_TAG=$VERSION-dev</code></li><li><strong>test</strong>: <code>SUBDOMAIN=test.$DOMAIN</code>, <code>VERSION_TAG=$VERSION-test</code></li><li><strong>prod</strong>: <code>SUBDOMAIN=$DOMAIN</code>, <code>VERSION_TAG=$VERSION-prod</code></li></ul><p>The subdomain is usually used to build a fully-qualified domain name for the application based on its name, i.e. <code>$APP.$SUBDOMAIN</code>. The version tag defines the name of the created Docker images as <code>$APP:$VERSION_TAG</code>.</p><h2 id="deployment-workspace" tabindex="-1">Deployment workspace <a class="header-anchor" href="#deployment-workspace" aria-label="Permalink to &quot;Deployment workspace&quot;">​</a></h2><p>Each build stage of the CI/CD pipeline first setup the &quot;workspace&quot; required to correctly build the application, i.e. environment variables, application and module source code, configuration files, etc. The following schema summarizes the different steps performed to setup the workspace in the <em>travis.env.sh</em> script:</p><p><img src="'+s+'" alt="Travis scripts"></p><p>In order to simplify and unify as much as possible secrets management we use a private GitHub repository as a secret store for:</p><ul><li>environment variables through env files <ul><li><strong>.env</strong> for application configuration</li><li><strong>.travis.env</strong> for CI/CD configuration</li></ul></li><li>configuration files required either by the application or the CI/CD (e.g. mobile application certificates, ssh key to connect to hosting infrastructures, etc.)</li></ul><p>Each workspace includes a <strong>common</strong> folder to store shared secrets between all flavor, then a folder dedicated to secrets specific to each flavor as depicted in the following diagram:</p><p><img src="'+n+'" alt="KDK workspace"></p><h2 id="web-application-deployment" tabindex="-1">Web application deployment <a class="header-anchor" href="#web-application-deployment" aria-label="Permalink to &quot;Web application deployment&quot;">​</a></h2><p>The following schema summarizes the different steps performed to deploy the web application:</p><p><img src="'+l+'" alt="Travis scripts"></p><h2 id="mobile-applications-deployment" tabindex="-1">Mobile applications deployment <a class="header-anchor" href="#mobile-applications-deployment" aria-label="Permalink to &quot;Mobile applications deployment&quot;">​</a></h2><p>The following schema summarizes the different steps performed to deploy the Android application:</p><p><img src="'+p+'" alt="Travis scripts"></p><p>The following schema summarizes the different steps performed to deploy the IOS application:</p><p><img src="'+d+'" alt="Travis scripts"></p>',35),u=[h];function m(f,g,v,b,y,k){return o(),t("div",null,u)}const I=e(c,[["render",m]]);export{A as __pageData,I as default};