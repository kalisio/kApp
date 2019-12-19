import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'

export default class App {
  constructor () {
    this.error = VueSelector('q-toast')
    // Login Screen
    this.loginScreen = VueSelector('k-login k-screen')
    this.emailInput = VueSelector('k-login k-email-field')
    this.passwordInput = VueSelector('k-login k-password-field')
    //this.loginLocal = Selector('button[type=button]').nth(2)
    this.loginLocal = Selector(() => {
      return document.getElementById('local') 
    })
    this.registerLink = Selector('#register-link')
    // Logout screen
    this.logoutScreen = VueSelector('k-logout k-screen')
    this.logout = VueSelector('k-links-panel').find('.q-icon').withText('exit_to_app')
    // Register screen
    this.registerScreen = VueSelector('k-register k-screen')
    this.registerNameInput = VueSelector('k-register k-text-field')
    this.registerEmailInput = VueSelector('k-register k-email-field')
    this.registerPasswordInput = VueSelector('k-register k-password-field').nth(0)
    this.registerConfirmPasswordInput = VueSelector('k-register k-password-field').nth(1)
    this.registerAcceptTerms = VueSelector('k-register k-toggle-field').find('.q-toggle')
    this.registerButton = Selector('button[type=button]').nth(0)
    this.loginLink = Selector('#login-link')
    // Layout
    this.appBar = VueSelector('k-app-bar')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.appBarOverflowMenu = Selector('#overflow-menu')
    this.appBarOverflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    this.sideNavToggle = this.appBar.find('#ap')
    this.sideNav = VueSelector('k-side-nav')
    this.tabBar = VueSelector('k-tab-bar')
    this.fab = Selector('#fab')
    this.identityPanel = VueSelector('k-identity-panel')
    this.identityLink = Selector('#account')
    this.signupAlert = VueSelector('k-signup-alert')
    this.idSelector = Selector((id) => { return document.getElementById(id) })
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

  async logIn (test, credentials = {}) {
    await test
      .typeText(this.emailInput, credentials.email || defaultTestUser.email, { replace: true })
      .typeText(this.passwordInput, credentials.password || defaultTestUser.password, { replace: true })
      .click(this.loginLocal)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(500)
  }

  async logInAndCloseSignupAlert (test, credentials = {}) {
    await this.logIn(test, credentials)
    await this.closeSignupAlert(test)
  }

  async logOut (test, openSideNav) {
    if (openSideNav)await this.openSideNav(test)
    await test
      .click(this.logout)
      // Need this so that we are sure the page has been loaded
      .wait(500)
  }

  async register (test, identity = {}) {
    await test
      .typeText(this.registerNameInput, identity.name || defaultTestUser.name, { replace: true })
      .typeText(this.registerEmailInput, identity.email || defaultTestUser.email, { replace: true })
      .typeText(this.registerPasswordInput, identity.password || defaultTestUser.password, { replace: true })
      .typeText(this.registerConfirmPasswordInput, identity.password || defaultTestUser.password, { replace: true })
      .click(this.registerAcceptTerms)
      .click(this.registerButton)
      // Need this so that we are sure dynamic components, user, etc. have been loaded
      .wait(5000)
  }
}
