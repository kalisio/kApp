import logger from 'loglevel'
import kdkCore from '@kalisio/kdk/core.client'
import CustomService from './custom.service'

export default function () {
  const api = this

  // Set up our plugin services
  try {
    api.configure(kdkCore)
    api.createService('custom', { service: CustomService })
  } catch (error) {
    logger.error(error.message)
  }
}
