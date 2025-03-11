/* eslint-disable no-unused-expressions */

import chai, { util } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'
import { type } from '@kalisio/kdk/test/client/core/utils.js'

const suite = 'webpush'

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
  })

  it('webpush', async () => {
    await page.click('#left-opener')
    await page.waitForTimeout(1000)
    await page.click('#webpush-activity-action')
    await page.waitForTimeout(1000)
    await type(page, '#title-field', 'Title')
    await type(page, '#body-field', 'Content')
    await type(page, '#icon-field', 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kapp/kapp-icon-color-2048x2048.png')
    await type(page, '#url-field', 'https://kalisio.com')
    await core.clickAction(page, 'push-btn')
    await page.waitForTimeout(1000)
  })

  it('webpush-clean', async () => {
    const cancelButtons = await page.$x('//button[contains(text(), "cancel")]')
    for (const cancelButton of cancelButtons) {
      await cancelButton.click()
    }
    await page.waitForTimeout(1000)
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
