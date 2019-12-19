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

test('Navigating through the screens', async test => {
  await test.setTestSpeed(0.8)
  await app.goToRegisterScreen(test)
  await app.goToLoginScreen(test)
})

test('Authenticating to the app', async test => {
  await test.setTestSpeed(0.8)
  await app.goToRegisterScreen(test)
  await app.register(test, { name: 'kalisio', email: 'kalisio@kalisio.xyz', password: 'Pass;word1' })
  await test.takeScreenshot('./screenshots.jpg')
  //await app.logIn(test, { email: 'kalisio@kalisio.xyz', password: 'Pass;word1' })
  //await test.takeScreenshot('./screenshots.jpg')
  await app.logOut(test, false)
})
