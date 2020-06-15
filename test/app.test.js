// Page models
import * as pages from './page-models'

fixture`app`// declare the fixture
  .page`${pages.getUrl()}` // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
  })
  .afterEach(async test => {
    // check for console error messages
    await pages.checkNoClientError(test)
  })

const screens = new pages.Screens()
const layout = new pages.Layout()
const sideNav = new pages.SideNav()
const docs = new pages.Documents(layout)

const user = {
  name: 'kalisio',
  email: 'kalisio@kalisio.xyz',
  password: 'Pass;word1'
}

test('Registering to the app', async test => {
  await screens.goToRegisterScreen(test)
  await screens.register(test, user)
  await layout.clickLeftOpener(test)
  await sideNav.logout(test)
})

test('Authenticating to the app', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await sideNav.logout(test)
  await screens.goToLoginScreen(test)
})

test('Create document', async test => {
  await screens.login(test, user)
  await docs.create(test, { name: 'document1' })
  await layout.clickLeftOpener(test)
  await sideNav.logout(test)
})

test('Delete document', async test => {
  await screens.login(test, user)
  await docs.delete(test)
  await layout.clickLeftOpener(test)
  await sideNav.logout(test)
})
