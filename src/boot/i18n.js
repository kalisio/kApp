import logger from 'loglevel'
import i18next from 'i18next'
import VueI18next from '@panter/vue-i18next'
import { Quasar } from 'quasar'
import { utils as kCoreUtils } from '@kalisio/kdk/core.client'
import utils from '../utils'
import config from 'config'

export default async ({ app, Vue }) => {
  // Define the locale to be used
  const localeConfig = config.locale || {}
  const localeBrowser = kCoreUtils.getLocale()
  const locale = localeConfig.default || localeBrowser
  // Initializes i18next
  i18next.init({
    lng: locale,
    fallbackLng: localeConfig.fallback || 'en',
    defaultNS: ['kdk']
  })
  // Set Quasar language pack
  try {
    const lang = await import('quasar/lang/' + locale)
    Quasar.lang.set(lang.default)
  }
  catch (error) {
    logger.error(error.message)
  } 
  // Load the translation files
  const modules = ['core', 'app']
  try {
    // Build the translation resolvers
    const translationResolvers = modules.map(module => {
      return utils.loadTranslation(module, locale)
    })
    // Apply the resolvers and add the translation bundles to i18next
    const translations = await Promise.all(translationResolvers)
    translations.forEach((translation) => {
      i18next.addResourceBundle(locale, 'kdk', translation, true, true)
    })
  } catch (error) {
    logger.error(error.message)
  }
  Vue.use(VueI18next)
  app.i18n = new VueI18next(i18next)
}
