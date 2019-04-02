import i18next from 'i18next'
import VueI18next from '@panter/vue-i18next'
import { configureI18n } from '../i18n'

export default async ({ app, Vue }) => {
  configureI18n()
  Vue.use(VueI18next)
  app.i18n = new VueI18next(i18next)
}
