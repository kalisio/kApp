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

const app = new pages.Application()
const docs = new pages.Documents()

test('Registering to the app', async test => {
  await app.goToRegisterScreen(test)
  await app.register(test)
  await app.logout(test)
})

test('Authenticating to the app', async test => {
  await app.login(test)
  await app.logout(test)
})

test('Create document', async test => {
  await app.login(test)
  await docs.create(test, { name: 'document1' })
  await app.logout(test)
})

test('Delete document', async test => {
  await app.login(test)
  await docs.delete(test)
  await app.logout(test)
})
