// import 'whatwg-fetch'
import { authenticationGuard, beforeGuard, Events, i18n, initializeApi, utils as kdkCoreUtils, Layout, Store, utils } from '@kalisio/kdk/core.client'
import config from 'config'
import _ from 'lodash'
import logger from 'loglevel'
import { Notify } from 'quasar'
import appHooks from '../main.hooks'
import services from '../services'

export default async ({ app }) => {
  // Initializes i18n first to avoid any browser translation
  await i18n.initialize(app, ['core', 'app', 'map'])
  // Initiate the client
  const api = await initializeApi()

  // Setup app hooks
  api.hooks(appHooks)

  // Then all services
  await services.call(api)

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
  app.component('KAction', await kdkCoreUtils.loadComponent('action/KAction'))
  app.component('KToggleFullscreenAction', await kdkCoreUtils.loadComponent('action/KToggleFullscreenAction'))
  app.component('KPanel', await kdkCoreUtils.loadComponent('KPanel'))
  app.component('KStamp', await kdkCoreUtils.loadComponent('KStamp'))
  app.component('KIcon', await kdkCoreUtils.loadComponent('graphics/KIcon'))
  app.component('KChip', await kdkCoreUtils.loadComponent('KChip'))
  app.component('KRibbon', await kdkCoreUtils.loadComponent('media/KRibbon'))
  app.component('KModal', await kdkCoreUtils.loadComponent('KModal'))
  app.component('KDialog', await kdkCoreUtils.loadComponent('KDialog'))
  app.component('KBoard', await kdkCoreUtils.loadComponent('collection/KBoard'))
  app.component('KDate', await kdkCoreUtils.loadComponent('time/KDate'))
  app.component('KTime', await kdkCoreUtils.loadComponent('time/KTime'))
  app.component('KDateTime', await kdkCoreUtils.loadComponent('time/KDateTime'))
  app.component('KDateTimeRange', await kdkCoreUtils.loadComponent('time/KDateTimeRange'))
  app.component('KDocument', await kdkCoreUtils.loadComponent('document/KDocument'))
  app.component('KForm', await kdkCoreUtils.loadComponent('form/KForm'))
  app.component('KChart', await kdkCoreUtils.loadComponent('chart/KChart'))
  app.component('KPage', await kdkCoreUtils.loadComponent('layout/KPage'))
  app.component('KShape', await kdkCoreUtils.loadComponent('media/KShape'))
  app.component('KColorScale', await kdkCoreUtils.loadComponent('media/KColorScale'))
  app.component('KStore', await kdkCoreUtils.loadComponent('KStore'))
  app.component('KTour', await kdkCoreUtils.loadComponent('app/KTour'))
  app.component('KTimeLine', await kdkCoreUtils.loadComponent('collection/KTimeLine'))
  app.component('KActivity', await kdkCoreUtils.loadComponent('KActivity'))

  // Register global properties
  // FIXME: This is used for testing purpose, don't know how to access this from Puppeteer otherwise
  global.$store = app.config.globalProperties.$store
  global.$layout = app.config.globalProperties.$layout
  global.$api = app.config.globalProperties.$api

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)

  // Subscribe to webpush notifications
  api.on('authenticated', (data) => {
    // User will be updated in store just after login so that we need to wait for the event
    Events.once('user-changed', utils.subscribeToPushNotifications)
  })

  // For debug purpose
  logger.debug('[KDK] is now ready:', Store.get('kdk'))
}
