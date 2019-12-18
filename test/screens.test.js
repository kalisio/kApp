// Page models
import * as pages from './page-models'

fixture`Screens`// declare the fixture
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

const app = new pages.Application()

test('Go to register screen', async test => {
  await app.goToRegisterScreen(test)
  await test.wait(500)
  await app.goToLoginScreen(test)
})
  
