/* eslint-disable no-unused-expressions */

import { core } from './kdk/index.mjs'
import chai, { util } from 'chai'
import chailint from 'chai-lint'

const suite = 'messages'

describe(`suite:${suite}`, () => {
  let runner
  let page
  let user

  before(async () => {
    chailint(chai, util)

    runner = new core.Runner(suite, {
      appName: 'kapp',
      browser: {
        slowMo: 2
      },
      localStorage: {
        'k-app-welcome': false,
        'k-app-install': false
      },
      lang: 'fr-FR'
    })
    page = await runner.start()
    user = {
      email: 'kalisio@kalisio.xyz',
      password: 'Pass;word1'
    }
    await core.login(page, user)

    await page.click('#left-opener')
    await page.waitForTimeout(500)
    await page.click('#messages-activity-action')
    await page.waitForTimeout(500)
  })

  it.skip('check messages count', async () => {
    await page.waitForTimeout(1500)
    const nbMessages = await core.countItems(page, 'messages/KMessageCard')
    console.log('NUMBER OF MESSAGES: ' + nbMessages)
    await page.waitForTimeout(15000)
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
