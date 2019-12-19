// Page models
import * as pages from './page-models'

fixture`app`// declare the fixture
  .page`${pages.getUrl()}` // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    await pages.checkNoClientError(test)
  })

const app = new pages.App()

const user = {
  name: 'kalisio', 
  email: 'kalisio@kalisio.xyz', 
  password: 'Pass;word1'
}

test('Navigating through the screens', async test => {
  await app.goToRegisterScreen(test)
  await app.goToLoginScreen(test)
})

test('Registering to the app', async test => {
  await app.goToRegisterScreen(test)
  await app.register(test, user)
  await app.logOut(test, false)
})

test('Authenticating to the app', async test => {
  await app.goToRegisterScreen(test)
  await app.register(test, user)
  await app.logOut(test, false)
})
