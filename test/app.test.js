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
    await screens.goToLoginScreen(test)
    await pages.checkNoClientError(test)
  })

const screens = new pages.Screens()
const layout = new pages.Layout()
const account = new pages.Account()
const docs = new pages.Documents(layout)

const user = {
  name: 'testcafe',
  email: 'testcafe@kalisio.xyz',
  password: 'Pass;word1'
}

test('Registering to the app', async test => {
  await screens.goToRegisterScreen(test)
  await screens.register(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Authenticating to the app', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Checking the layout', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'layout')
  await test.expect(await layout.isTopPaneOpened()).ok()
  await test.expect(await layout.isLeftPaneOpened()).notOk()
  await test.expect(await layout.isRightPaneOpened()).notOk()
  await test.expect(await layout.isBottomPaneOpened()).notOk()
  await layout.clickTopOpener(test)
  await test.expect(await layout.isTopPaneOpened()).notOk()
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightPaneOpened()).ok()
  await layout.clickBottomOpener(test)
  await test.expect(await layout.isBottomPaneOpened()).ok()
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Create document', async test => {
  await screens.login(test, user)
  await docs.create(test, { name: 'document1' })
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Delete document', async test => {
  await screens.login(test, user)
  await docs.delete(test, 'document1')
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Delete account', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Account.MANAGE_ACCOUNT)
  await layout.clickTopPaneAction(test, pages.Account.SECURITY)
  await layout.clickTopPaneAction(test, pages.Account.DANGER_ZONE)
  await account.delete(test, user.name)
})
