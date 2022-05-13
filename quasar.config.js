/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const path = require('path')
const fs = require('fs')
const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')

const serverPort = process.env.PORT || process.env.HTTPS_PORT || 8081
const clientPort = process.env.CLIENT_PORT || process.env.HTTPS_CLIENT_PORT || 8080

// Load config based on current NODE_ENV, etc.
const clientConfig = require('config')
// Write JSON config
fs.writeFileSync(path.join('config', 'client-config.json'), JSON.stringify(clientConfig))

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: [
      'i18n',
      'kdk'
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'roboto-font',
      'material-icons',
      'line-awesome',
      'fontawesome-v5'
    ],

    // https://quasar.dev/quasar-cli-webpack/quasar-config-js#property-htmlvariables
    htmlVariables: {
      appName: 'kApp',
      appSlug: 'kapp'
      
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      // preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://v2.quasar.dev/quasaextend r-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      
      chainWebpack (chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: [ 'js', 'vue' ] }])
        // This is required since webpack 5 removed nodejs polyfilss
        // see https://quasar.dev/start/upgrade-guide#nodejs-polyfills
        const nodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
        chain.plugin('node-polyfill').use(nodePolyfillWebpackPlugin)
      },

      extendWebpack (cfg) {
        cfg.resolve.modules = [
          path.resolve(__dirname, 'node_modules')
        ],
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing aliases
          '@components': [
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/client/components')
          ],
          '@schemas': [
            path.resolve(__dirname, 'src/schemas'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/commmon/schemas')
          ],
          '@i18n': [
            path.resolve(__dirname, 'src/i18n'),
            path.resolve(__dirname, 'node_modules/@kalisio/kdk/core/client/i18n')
          ],
          config: path.resolve(__dirname, 'config/client-config.json')
        },
        cfg.optimization.minimize = process.env.DEBUG ? false : cfg.optimization.minimize
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      port: clientPort,
      proxy: {
        '/api': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          logLevel: 'debug'
        },
        '/apiws': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          ws: true,
          logLevel: 'debug'
        },
        // The auth endpoints are not easy to prefix so we manage it manually
        '/auth': {
          target: 'http://localhost:' + serverPort,
          changeOrigin: true,
          logLevel: 'debug'
        }
      },
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Platform',
        'Loading'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [
      'fadeIn',
      'fadeOut'
    ],

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
        // Tell browser when a file from the server should expire from cache (in ms)

      
      chainWebpackWebserver (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      
      chainWebpackCustomSW (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      
      manifest: {
        name: `kApp`,
        short_name: `kapp`,
        description: `A sample KDK application`,
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/kapp-icon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: 'icons/kapp-icon-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'icons/kapp-icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/kapp-icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/kapp-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      id: process.env.PACKAGE_ID
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'kapp'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      
      chainWebpackMain (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      
      chainWebpackPreload (chain) {
        chain.plugin('eslint-webpack-plugin')
          .use(ESLintPlugin, [{ extensions: [ 'js' ] }])
      },
      
    }
  }
})
