// This test only works in headless mode because the 'misc' activity contains many elements that alter the size of the screenshot.
import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'

const suite = 'components'

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

  it('components', async () => {
    await page.click('#left-opener')
    await page.waitForTimeout(1000)

    await page.click('#components')
    await page.waitForTimeout(1000)
    const textModeMatch = await runner.captureAndMatch('text')
    expect(textModeMatch).beTrue()

    await page.click('#graphic')
    await page.waitForTimeout(1000)
    const graphicModeMatch = await runner.captureAndMatch('graphic')
    expect(graphicModeMatch).beTrue()

    await page.click('#time')
    await page.waitForTimeout(1000)
    const timeModeMatch = await runner.captureAndMatch('time')
    expect(timeModeMatch).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
