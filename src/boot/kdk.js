// import 'whatwg-fetch'
import _ from 'lodash'
import appHooks from '../main.hooks'
import services from '../services'
import { kalisio, utils as kCoreUtils, Store, Layout, Events, beforeGuard, authenticationGuard } from '@kalisio/kdk/core.client'
import config from 'config'
import utils from '../utils'

export default async ({ app }) => {
  const api = kalisio()

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
  app.config.globalProperties.$toast = kCoreUtils.toast
  app.config.globalProperties.$load = utils.load
  app.config.globalProperties.$loadComponent = utils.loadComponent
  app.config.globalProperties.$config = function (path, defaultValue) {
    return _.get(config, path, defaultValue)
  }

  // Register global properties
  // FIXME: This is used for testing purpose, don't know how to access this from Puppeteer otherwise
  global.$store = app.config.globalProperties.$store
  global.$layout = app.config.globalProperties.$layout
  global.$api = app.config.globalProperties.$api

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)
}
