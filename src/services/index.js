import kdkCore, { Storage } from '@kalisio/kdk/core.client'
import logger from 'loglevel'
import CustomService from './custom.service'

export default async function () {
  const api = this

  // Set up our plugin services
  try {
    await api.configure(kdkCore)
    api.createService('documents')
    api.createService('custom', { service: CustomService })
    Storage.createService()
  } catch (error) {
    logger.error(error.message)
  }
}
