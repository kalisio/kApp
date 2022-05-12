import { createI18n } from 'vue-i18n'
import { utils } from '@kalisio/kdk/core.client'
import config from 'config'

export default async ({ app }) => {
  // Define the locale to be used
  const fallbackLocale = config.fallbackLocale || 'en'
  const locale = utils.getAppLocale()
  // Create I18n instance using the translation bundles [core, app]
  app.use(createI18n({
    locale,
    fallbackLocale,
    messages: await utils.loadTranslations(['core', 'app'], locale, fallbackLocale)
  }))
}
