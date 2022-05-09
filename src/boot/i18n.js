import logger from 'loglevel'
import _ from 'lodash'
import { createI18n } from 'vue-i18n'
import { utils as kdkCoreUtils } from '@kalisio/kdk/core.client'
import config from 'config'

// Helper function to load a translation file
async function loadTranslationFile (bundle, locale) {
  const translationFile = bundle + '_' + locale + '.json'
  return await import(`@kalisio/kdk/core/client/i18n/${translationFile}`)
    .catch(errorCore => {
      return import(`../i18n/${translationFile}`)
        .catch(errorApp => {
          logger.error(errorCore, errorApp)
        })
    })
}

export default async ({ app }) => {
  // Define the locale to be used
  const fallbackLocale = config.fallbackLocale || 'en'
  const localeConfig = config.locale || {}
  const localeBrowser = kdkCoreUtils.getLocale()
  const locale = localeConfig.default || localeBrowser

  // Load the translation files
  const bundles = ['core', 'app']
  let messages = {}
  try {
    for (let i = 0; i < bundles.length; i++) {
      messages[locale] = _.merge(messages[locale], await loadTranslationFile(bundles[i], locale))
      messages[fallbackLocale] = _.merge(messages[fallbackLocale], await loadTranslationFile(bundles[i], fallbackLocale))
    }
  } catch (error) {
    logger.error(error.message)
  }

  // Create I18n instance
  app.use(createI18n({ 
    locale,
    fallbackLocale, 
    messages
  }))
}
