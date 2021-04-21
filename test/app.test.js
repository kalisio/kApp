// Page models
import * as pages from './page-models'
import faker from 'faker'

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
const docsList = new pages.Documents('list', 'QItem', layout)
const docsGrid = new pages.Documents('grid', 'QCard', layout)

const user = {
  name: 'testcafe',
  email: 'testcafe@kalisio.xyz',
  password: 'Pass;word1'
}

const doc1 = {
  name: faker.name.findName()
}

const doc2 = {
  name: faker.name.findName()
}

test('Registering to the app', async test => {
  await screens.goToRegisterScreen(test)
  await screens.register(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Checking the app', async test => {
  await screens.login(test, user)
  // Checking the layout
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'layout')
  await test.expect(await layout.isTopPaneOpened()).ok()
  await test.expect(await layout.isLeftPaneOpened()).notOk()
  await test.expect(await layout.isRightPaneOpened()).notOk()
  await test.expect(await layout.isBottomPaneOpened()).notOk()
  await layout.clickTopOpener(test)
  await test.expect(await layout.isTopPaneOpened()).notOk()
  await layout.clickTopOpener(test)
  await test.expect(await layout.isTopPaneOpened()).ok()
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightPaneOpened()).ok()
  await layout.clickRightOpener(test)
  await test.expect(await layout.isRightPaneOpened()).notOk()
  await layout.clickBottomOpener(test)
  await test.expect(await layout.isBottomPaneOpened()).ok()
  await layout.clickBottomOpener(test)
  await test.expect(await layout.isBottomPaneOpened()).notOk()
  // Checking the account
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Account.MANAGE_ACCOUNT)
  await layout.clickTopPaneAction(test, pages.Account.SECURITY)
  await layout.clickTopPaneAction(test, pages.Account.DANGER_ZONE)
  // Checking the collection
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'collection')
  await layout.clickTopPaneAction(test, 'grid')
  // FIXME: await layout.clickTopPaneAction(test, 'table')
  // Checking the kanban
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'kanban')
  // Checking the editor
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'editor')
  // Logout
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Create document', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'collection')
  const docsCount = await docsList.count()
  await docsList.create(test, doc1)
  await docsList.checkExists(test, doc1.name)
  await docsList.checkCount(test, docsCount + 1)
  await layout.clickTopPaneAction(test, 'grid')
  await docsGrid.checkCount(test, docsCount + 1)
  await docsGrid.create(test, doc2)
  await docsGrid.checkExists(test, doc1.name)
  await docsGrid.checkCount(test, docsCount + 2)
  await layout.clickTopPaneAction(test, 'list')
  await docsList.checkCount(test, docsCount + 2)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Layout.LOGOUT)
})

test('Delete document', async test => {
  await screens.login(test, user)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, 'collection')
  const docsCount = await docsList.count()
  await docsList.delete(test, doc1)
  await docsList.checkNotExists(test, doc1.name)
  await docsList.checkCount(test, docsCount - 1)
  await layout.clickTopPaneAction(test, 'grid')
  await docsGrid.checkCount(test, docsCount - 1)
  await docsGrid.delete(test, doc2)
  await docsGrid.checkNotExists(test, doc2.name)
  await docsGrid.checkCount(test, docsCount - 2)
  await layout.clickTopPaneAction(test, 'list')
  await docsList.checkCount(test, docsCount - 2)
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
