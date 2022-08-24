// import 'whatwg-fetch'
import _ from 'lodash'
import config from 'config'
import { Notify } from 'quasar'
import appHooks from '../main.hooks'
import services from '../services'
import { api, utils as kdkCoreUtils, Store, Layout, Events, beforeGuard, authenticationGuard } from '@kalisio/kdk/core.client'

export default async ({ app }) => {
  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

  // Register global properties to the the vue app
  app.config.globalProperties.$store = Store
  app.config.globalProperties.$layout = Layout
  app.config.globalProperties.$events = Events
  app.config.globalProperties.$api = api
  app.config.globalProperties.$can = api.can
  app.config.globalProperties.$notify = Notify.create
  app.config.globalProperties.$tie = function (key, param) {
    if (_.isEmpty(key)) return key
    return this.$te(key) ? this.$t(key, param) : key
  }
  app.config.globalProperties.$config = function (path, defaultValue) {
    return _.get(config, path, defaultValue)
  }

  // Register global components
  app.component('KAction', await kdkCoreUtils.loadComponent('frame/KAction'))
  app.component('KPanel', await kdkCoreUtils.loadComponent('frame/KPanel'))
  app.component('KStamp', await kdkCoreUtils.loadComponent('frame/KStamp'))
  app.component('KModal', await kdkCoreUtils.loadComponent('frame/KModal'))
  app.component('KForm', await kdkCoreUtils.loadComponent('form/KForm'))
  app.component('KChart', await kdkCoreUtils.loadComponent('chart/KChart'))
  app.component('KPage', await kdkCoreUtils.loadComponent('layout/KPage'))

  // Register global properties
  // FIXME: This is used for testing purpose, don't know how to access this from Puppeteer otherwise
  global.$store = app.config.globalProperties.$store
  global.$layout = app.config.globalProperties.$layout
  global.$api = app.config.globalProperties.$api

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)
}