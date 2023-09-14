// import 'whatwg-fetch'
import _ from 'lodash'
import logger from 'loglevel'
import config from 'config'
import { Notify } from 'quasar'
import appHooks from '../main.hooks'
import services from '../services'
import { utils, initializeApi, i18n, utils as kdkCoreUtils, Store, Layout, Events, beforeGuard, authenticationGuard } from '@kalisio/kdk/core.client'

export default async ({ app }) => {
  // Initiate the client
  const api = initializeApi()

  // Setup app hooks
  api.hooks(appHooks)

  // Then all services
  await services.call(api)

  // Initializes i18n
  await i18n.initialize(app, ['core', 'app', 'map'])

  // Register global properties to the the vue app
  app.config.globalProperties.$store = Store
  app.config.globalProperties.$layout = Layout
  app.config.globalProperties.$events = Events
  app.config.globalProperties.$api = api
  app.config.globalProperties.$can = api.can
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$tie = i18n.tie.bind(i18n)
  app.config.globalProperties.$config = function (path, defaultValue) {
    return _.get(config, path, defaultValue)
  }

  // Register global components
  app.component('KAction', await kdkCoreUtils.loadComponent('KAction'))
  app.component('KPanel', await kdkCoreUtils.loadComponent('KPanel'))
  app.component('KStamp', await kdkCoreUtils.loadComponent('KStamp'))
  app.component('KModal', await kdkCoreUtils.loadComponent('KModal'))
  app.component('KDialog', await kdkCoreUtils.loadComponent('KDialog'))  
  app.component('KDate', await kdkCoreUtils.loadComponent('time/KDate'))
  app.component('KTime', await kdkCoreUtils.loadComponent('time/KTime'))
  app.component('KDateTime', await kdkCoreUtils.loadComponent('time/KDateTime'))
  app.component('KDateTimeRange', await kdkCoreUtils.loadComponent('time/KDateTimeRange'))
  app.component('KForm', await kdkCoreUtils.loadComponent('form/KForm'))
  app.component('KChart', await kdkCoreUtils.loadComponent('chart/KChart'))
  app.component('KPage', await kdkCoreUtils.loadComponent('layout/KPage'))
  app.component('KShape', await kdkCoreUtils.loadComponent('media/KShape'))
  app.component('KColorScale', await kdkCoreUtils.loadComponent('media/KColorScale'))
  app.component('KStore', await kdkCoreUtils.loadComponent('KStore'))
  app.component('KTour', await kdkCoreUtils.loadComponent('app/KTour'))
  app.component('KScrollArea', await kdkCoreUtils.loadComponent('KScrollArea'))

  // Register global properties
  // FIXME: This is used for testing purpose, don't know how to access this from Puppeteer otherwise
  global.$store = app.config.globalProperties.$store
  global.$layout = app.config.globalProperties.$layout
  global.$api = app.config.globalProperties.$api

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)

  // Subscribe to webpush notifications
  api.on('authenticated', (data) => {
    utils.subscribeToPushNotifications()
  })

  // For debug purpose
  logger.debug(`[KDK] is now ready: ${JSON.stringify(Store.get('kdk'), null, 4)}`)
}
