import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import Page from './page'

export default class AppBar extends Page {
  constructor () {
    super()
    // AppBar
    this.appBar = VueSelector('k-app-bar')
    this.appBarTitle = this.appBar.find('#app-bar-title')
    this.appBarOverflowMenu = Selector('#overflow-menu')
    this.appBarOverflowMenuEntry = this.appBar.find('#overflow-menu-entry')
    this.sideNavToggle = this.appBar.find('#left-drawer-toggle')
    // SideNav
    this.sideNav = VueSelector('k-side-nav')
    this.identityPanel = VueSelector('k-identity-panel')
    this.identityLink = Selector('#account')
    this.logoutLink = VueSelector('k-links-panel').find('.q-icon').withText('exit_to_app')
    // TabBar
    this.tabBar = VueSelector('k-tab-bar')
    // Fab
    this.fab = Selector('#fab')
    // SignupAlert
    this.signupAlert = VueSelector('k-signup-alert')
  }

  // Sidenav functions
  async isSideNavVisible () {
    // quasar actually hides the sideNav by translating it outside the viewport,
    // so that the visible flag is always true
    const leftPos = await this.sideNav.getBoundingClientRectProperty('left')
    return leftPos >= 0
  }

  async openSideNav (test) {
    const isSideNavVisible = await this.isSideNavVisible()
    if (!isSideNavVisible) {
      await test
        .click(this.sideNavToggle)
        .wait(500)
    }
  }

  async logout (test) {
    await this.openSideNav(test)
    await test
      .click(this.logoutLink)
      .wait(500)
  }

  async clickIdentity (test) {
    await this.openSideNav(test)
    await test
      .click(this.identityLink)
      .wait(1000)
  }

  async checkIdentity (test, name) {
    const identityPanel = await this.identityPanel.getVue()
    await test.expect(identityPanel.state.name).eql(name, 'User name is invalid')
  }

  // TabBar
  async clickTabBar (test, tab) {
    await test
      .click(this.tabBar.find(tab))
      .wait(3000)
  }

  // Fab
  async openAndClickFab (test, entry) {
    await test
      .click(Selector(this.fab))
      .wait(1000)
    await test
      .click(this.fab.find(entry))
      .wait(1000)
  }

  async clickFab (test, entry) {
    await test
      .click(Selector(entry))
      .wait(1000)
  }

  // SignupAlert
  async closeSignupAlert (test) {
    await test
      .click(this.signupAlert.find('.q-alert-close').find('.cursor-pointer'))
      .wait(1000)
  }

  // Helpers
  async clickToolbar (test, entry) {
    await test
      .click(this.appBar.find(entry))
      .wait(3000)
  }

  async clickOverflowMenu (test, entry) {
    await test
      .click(this.appBarOverflowMenuEntry)
      .click(this.appBarOverflowMenu.find(entry))
      .wait(1000)
  }
}
