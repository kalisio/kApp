// Configuration for your app
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const serverPort = process.env.PORT || process.env.HTTPS_PORT || 8081
const clientPort = process.env.CLIENT_PORT || process.env.HTTPS_CLIENT_PORT || 8080

// Load config based on current NODE_ENV, etc.
const clientConfig = require('config')

function resolve (dir) {
  // return path.join(__dirname, '..', dir)
  return path.resolve(__dirname, dir)
}

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      // The order in which the plugins/boot files are called is important!
      // The event system must be set up first.
      'events',
      'api',
      'i18n'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        // 'QLayout',
        // 'QHeader',
        // 'QDrawer',
        // 'QPageContainer',
        // 'QPage',
        // 'QToolbar',
        // 'QToolbarTitle',
        // 'QBtn',
        // 'QIcon',
        // 'QList',
        // 'QItem',
        // 'QItemSection',
        // 'QItemLabel'
      ],

      directives: [
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ],

      // iconSet: 'ionicons-v4'
      // iconSet: 'fontawesome-v5'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg, { isServer, isClient }) {
        // TODO does this work?
        cfg.devtool = ctx.dev ? '#source-map' : '',
        // TODO fix this
        // cfg.output.sourcePrefix = '', // Required for Cesium, see https://github.com/AnalyticalGraphicsInc/cesium/issues/4876
        // cfg.externals.fs = true, // Required for Cesium, https://github.com/AnalyticalGraphicsInc/cesium/issues/4838
        // cfg.resolve.extensions = ['.js', '.vue', '.json'],
        cfg.resolve.modules = [
          path.resolve(__dirname, ''),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules')
        ],
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing aliases
          assets: path.resolve(__dirname, './src/assets'),
          schemas: path.resolve(__dirname, './src/schemas'),
          '@': path.resolve(__dirname, './src/components'),
          // TODO the client-config.json file needs to be built by webpack
          config: path.resolve(__dirname, './config/client-config.json')
          // config: path.resolve(__dirname, './client-config.json')
        },
        cfg.module.unknownContextCritical = false, // Required for Cesium, see https://github.com/AnalyticalGraphicsInc/cesium/issues/4876
        cfg.module.unknownContextRegExp = /^.\/.*$/, // Required for Cesium, https://github.com/mmacaula/cesium-webpack/issues/4
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        }),
        cfg.module.rules.push({
          test: /\.js.map$/,
          loader: 'ignore-loader'
        }),
        cfg.plugins.push(new webpack.DefinePlugin({
            // 'process.env': config[env.prod ? 'build' : 'dev'].env,
            'DEV': ctx.dev,
            'PROD': !ctx.dev  //,
            // '__THEME': '"' + env.platform.theme + '"'
          })
        ),
        // cfg.plugins.push(new webpack.LoaderOptionsPlugin({
        //     minimize: env.prod,
        //     options: {
        //       context: path.resolve(__dirname, '../src'),
        //       postcss: cssUtils.postcss
        //     }
        //   }),
        // ),
        // TODO for Cesium?
        cfg.plugins.push(new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
          })
        )
      }
    },

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
        }
      },
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

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

        // appId: 'quasar-app'
      }
    }
  }
}

// This will take the config based on the current NODE_ENV and save it to 'build/client.json'
// Note: If '/build' does not exist, this command will error; alternatively, write to '/config'.
// The webpack alias below will then build that file into the client build.
fs.writeFileSync(path.join('config', 'client-config.json'), JSON.stringify(clientConfig))

