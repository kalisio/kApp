import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export default class Application {
  constructor () {
    this.error = VueSelector('q-toast')
    this.registerLink = Selector('#register-link')
    this.loginLink = Selector('#login-link')
  }

  async goToLoginScreen (test) {
    await test.click(this.loginLink)
  }

  async goToRegisterScreen (test) {
    await test.click(this.registerLink)
  }

  async isErrorVisible () {
    await this.error.visible
  }
}
