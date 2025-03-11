// This test only works in headless mode because the 'misc' activity contains many elements that alter the size of the screenshot.
import { core } from '@kalisio/kdk/test.client.js'
import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'
import { isSliderDisabled } from './helpers/components.mjs'
import { isElementVisible } from './helpers/core.mjs'

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
      lang: 'fr-FR',
    })
    page = await runner.start()
    user = {
      email: 'kalisio@kalisio.xyz',
      password: 'Pass;word1'
    }
    await core.login(page, user)

    await page.click('#left-opener')
    await page.waitForTimeout(1000)

    await page.click('#components-activity-action')
    await page.waitForTimeout(1000)
  })

  it('check text', async () => {
    const textModeMatch = await runner.captureAndMatch('text')
    expect(textModeMatch).beTrue()

    await page.click('.q-card:first-child button:has(.la-code)')
    await page.waitForTimeout(1000)

    const textModeMatch2 = await runner.captureAndMatch('text2')
    expect(textModeMatch2).beTrue()
  });

  it('check graphic', async () => {
    await page.click('#graphic')
    await page.waitForTimeout(1000)
    const graphicModeMatch = await runner.captureAndMatch('graphic')
    expect(graphicModeMatch).beTrue()
  });

  it('check time', async () => {
    await page.click('#time')
    await page.waitForTimeout(1000)

    expect(await isElementVisible(page, '#date-picker')).beFalse()

    await page.click('#date-button')
    expect(await isElementVisible(page, '#date-picker')).beTrue()
    expect(await isElementVisible(page, '#time-picker')).beFalse()

    await page.click('#time-button')
    expect(await isElementVisible(page, '#time-picker')).beTrue()
    expect(await isSliderDisabled(page)).beTrue()

    // Last KDateTimeRange Date button
    await page.click('#slider-range-max #date-button')
    await page.waitForTimeout(500)
    // Next month arrow
    await page.click('.q-date__navigation > div:nth-child(3) > button')
    await page.waitForTimeout(500)
    // Last day of month
    await page.click('.q-date__calendar-days > div:nth-child(10) > button')
    await page.waitForTimeout(500)

    expect(await isSliderDisabled(page)).beFalse()
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
