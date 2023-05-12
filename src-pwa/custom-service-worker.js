/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxPluginMode is set to "InjectManifest"
 */

import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

// disable workbox logs 
self.__WB_DISABLE_DEV_LOGS = true

// Any new version will be activated immediately
self.skipWaiting()

// Use with precache injection 
precacheAndRoute(self.__WB_MANIFEST)

// Caching strategies
// Register route starts with http (all)
registerRoute(
  ({url}) => url.href.startsWith('http'),
  new NetworkFirst()
)