import { register } from 'register-service-worker'
import logger from 'loglevel'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  //registrationOptions: { scope: './' },

  ready (registration) {
    logger.debug('Service worker is active.')
  },

  registered (registration) {
    logger.debug('Service worker has been registered.')
  },

  cached (registration) {
    logger.debug('Content has been cached for offline use.')
  },

  updatefound (registration) {
    logger.debug('New content is downloading.')
  },

  updated (registration) {
    logger.warn('New content is available; please refresh.')
  },

  offline () {
    logger.warn('No internet connection found. App is running in offline mode.')
  },

  error (err) {
    logger.error('Error during service worker registration:', err)
  }
})
