// This test only works in headless mode because the 'misc' activity contains many elements that alter the size of the screenshot.
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'

const suite = 'misc'

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

  it('misc', async () => {
    await page.click('#left-opener')
    await page.waitForTimeout(1000)
    await page.click('#miscellaneous')
    await page.waitForTimeout(1000)
    const match = await runner.captureAndMatch('misc')
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})