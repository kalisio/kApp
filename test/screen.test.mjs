import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'
import { core } from './kdk/index.mjs'

const suite = 'screen'

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
      lang: 'fr'
    })
    page = await runner.start()
    user = {
      email: 'kalisio@kalisio.xyz',
      password: 'Pass;word1'
    }
    await core.login(page, user)
  })

  it('screen', async () => {
    await page.click('#left-opener')
    await core.waitForTimeout(1000)
    await page.click('#screen-activity-action')
    await core.waitForTimeout(1000)
    const match = await runner.captureAndMatch('screen')
    expect(match).beTrue()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
