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
        args: ['--lang=fr-FR'],
        slowMo: 2
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
          return 'fr-FR'
        }
      })
    })
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