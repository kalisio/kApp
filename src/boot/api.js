import 'whatwg-fetch'
import appHooks from '../main.hooks'
import services from '../services'
import plugin from '../vue-kdk'
import { kalisio, beforeGuard, authenticationGuard } from '@kalisio/kdk-core/client'

export default async ({ app, router, Vue }) => {
  let api = kalisio()

  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

  Vue.use(plugin, { api })

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)
  // Now done in index to ensure the session has been correctly restored before registering guards
  // router.beforeEach(beforeGuard)
}
