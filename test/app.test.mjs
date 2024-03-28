/* eslint-disable no-unused-expressions */

import faker from 'faker'
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'
import { createDocument, deleteDocumentItem, deleteDocumentCard } from './document.mjs'

const suite = 'app'

describe(`suite:${suite}`, () => {
  let runner
  let page
  let user

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kapp',
      browser: {
        args: ['--lang=fr'],
        slowMo: 1
      },
      localStorage: {
        'k-app-welcome': false,
        'k-app-install': false
      }
    })
    page = await runner.start()
    await page.evaluate(() => {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' })
      }
      Object.defineProperty(navigator, 'language', {
        get: function() {
          return 'fr'
        }
      })
    })
    await core.goToRegisterScreen(page)
    user = {
      name: 'kalisio',
      email: 'kalisio1@kalisio.xyz',
      password: 'Pass;word1'
    }
    await core.register(page, user)
  })

  it('update profile', async () => {
    await core.updateAccountProfile(page, 'My new name', runner.getDataPath('avatar.png'))
    user.name = 'My new name'
    await core.clickOpener(page, 'left')
    expect(await runner.captureAndMatch('profile')).beTrue()
  })

  it('check-collections', async () => {
    await core.clickPaneAction(page, 'left', 'collection', 1000)
    const nbDocuments = await core.countItems(page, 'collection/KItem')
    const doc1 = { name: faker.name.findName() }
    await createDocument(page, doc1)
    expect((nbDocuments + 1) === await core.countItems(page, 'collection/KItem')).to.true
    await core.clickAction(page, 'grid', 1000)
    const doc2 = { name: faker.name.findName() }
    await createDocument(page, doc2)
    expect((nbDocuments + 2) === await core.countItems(page, 'collection/KCard')).to.true
    await core.clickAction(page, 'list', 1000)
    await deleteDocumentItem(page, doc1)
    expect((nbDocuments + 1) === await core.countItems(page, 'collection/KItem')).to.true
    await core.clickAction(page, 'grid', 1000)
    await deleteDocumentCard(page, doc2)
    expect(nbDocuments === await core.countItems(page, 'collection/KCard')).to.true
  })

  after(async () => {
    await core.deleteAccount(page, user.name)
    await runner.stop()
  })
})
