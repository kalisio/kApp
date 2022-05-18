import { createI18n } from 'vue-i18n'
import { utils as kdkCoreUtils } from '@kalisio/kdk/core.client'

export default async ({ app }) => {
  // Define the locale to be used
  const fallbackLocale = kdkCoreUtils.getAppFallbackLocale()
  const locale = kdkCoreUtils.getAppLocale()
  // Create i18n instance using the translation bundles
  app.use(createI18n({
    locale,
    fallbackLocale,
    messages: await kdkCoreUtils.loadTranslations(['core', 'app'], locale, fallbackLocale),
    silentFallbackWarn: true
  }))
}
