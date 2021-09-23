import faker from 'faker'
import { expect } from 'chai'

import { core } from '@kalisio/kdk/test.client'
import { createDocument, deleteDocumentItem, deleteDocumentCard } from './document'

const suite = 'app'

describe(suite, () => {
  let runner
  let page
  let user

  before(async () => {
    runner = new core.Runner(suite, {
      appName: 'kapp',
      browser: { 
        args: ['--lang=fr'],
        slowMo: 1        
      }
    })
    page = await runner.start()
    await core.goToRegisterScreen(page)
    user = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: 'Pass;word1'
    }
    await core.register(page, user)
  })

  it('check-layout', async () => {
    await core.clickLeftPaneAction(page, 'layout')
    expect(await core.isTopPaneVisible(page)).be.true
    expect(await core.isRightPaneVisible(page)).be.false
    expect(await core.isBottomPaneVisible(page)).be.false
    expect(await core.isLeftPaneVisible(page)).be.false        
    await core.clickTopOpener(page)
    expect(await core.isTopPaneVisible(page)).be.false
    await core.clickTopOpener(page)
    expect(await core.isTopPaneVisible(page)).be.true
    await core.clickRightOpener(page)
    expect(await core.isRightPaneVisible(page)).be.true
    await core.clickRightOpener(page)
    expect(await core.isRightPaneVisible(page)).be.false
    await core.clickBottomOpener(page)
    expect(await core.isBottomPaneVisible(page)).be.true
    await core.clickBottomOpener(page)
    expect(await core.isBottomPaneVisible(page)).be.false
    await core.clickLeftOpener(page)
    expect(await core.isLeftPaneVisible(page)).be.true
    await core.clickLeftOpener(page)
    expect(await core.isLeftPaneVisible(page)).be.false
  })

  it('check-profile', async () => {
    await core.manageAccount(page, 'profile')
    await core.manageAccount(page, 'security')
    await core.manageAccount(page, 'danger-zone')
  })

  it('check-collections', async () => {
    await core.clickLeftPaneAction(page, 'collection', 1000)
    const nbDocuments = await core.countItems(page, 'collection/KItem')
    const doc1 = { name: faker.name.findName() }
    await createDocument(page, doc1)
    expect((nbDocuments + 1) === await core.countItems(page, 'collection/KItem')).to.true
    await core.clickTopPaneAction(page, 'grid', 1000)
    const doc2 = { name: faker.name.findName() }
    await createDocument(page, doc2)
    expect((nbDocuments + 2) === await core.countItems(page, 'collection/KCard')).to.true
    await core.clickTopPaneAction(page, 'list', 1000)
    await deleteDocumentItem(page, doc1)
    expect((nbDocuments + 1) === await core.countItems(page, 'collection/KItem')).to.true
    await core.clickTopPaneAction(page, 'grid', 1000)
    await deleteDocumentCard(page, doc2)
    expect(nbDocuments === await core.countItems(page, 'collection/KCard')).to.true
  })

  after(async () => {
    await core.deleteAccount(page, user.name)
    await runner.stop()
  })
})
