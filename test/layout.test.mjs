/* eslint-disable no-unused-expressions */

import { core } from '@kalisio/kdk/test.client.js'
import chai, { expect, util } from 'chai'
import chailint from 'chai-lint'

const suite = 'layout'

describe(`suite:${suite}`, () => {
  let runner
  let page
  let user
  const placements = ['left', 'top', 'right', 'bottom']

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
    await page.waitForTimeout(500)
    await page.click('#layout-activity-action')
    await page.waitForTimeout(500)
  })

  it('check-header-footer', async () => {
    expect(await core.isHeaderVisible(page)).beFalse()
    expect(await core.isFooterVisible(page)).beFalse()
    await core.clickAction(page, 'toggle-header')
    expect(await core.isHeaderVisible(page)).beTrue()
    await core.clickAction(page, 'toggle-footer')
    expect(await core.isFooterVisible(page)).beTrue()
    await core.clickAction(page, 'toggle-header')
    expect(await core.isHeaderVisible(page)).beFalse()
  })

  it('check-panes', async () => {
    await core.clickPaneAction(page, 'top', 'panes')
    expect(await core.isPaneVisible(page, 'top')).beTrue()
    expect(await core.isPaneVisible(page, 'right')).beFalse()
    expect(await core.isPaneVisible(page, 'bottom')).beFalse()
    expect(await core.isPaneVisible(page, 'left')).beFalse()
    await core.clickAction(page, 'toggle-top-pane')
    expect(await core.isPaneVisible(page, 'top')).beFalse()
    await core.clickAction(page, 'toggle-right-pane')
    expect(await core.isPaneVisible(page, 'right')).beTrue()
    await core.clickAction(page, 'toggle-right-pane')
    await core.clickAction(page, 'toggle-bottom-pane')
    expect(await core.isPaneVisible(page, 'bottom')).beTrue()
    await core.clickAction(page, 'toggle-bottom-pane')
    await core.clickAction(page, 'toggle-left-pane')
    expect(await core.isPaneVisible(page, 'left')).beTrue()
    await core.clickAction(page, 'toggle-left-pane')
  })

  it('check-windows', async () => {
    await core.clickPaneAction(page, 'top', 'windows')
    for (const placement of placements) {
      expect(await core.isWindowVisible(page, placement)).beFalse()
    }
    for (const placement of placements) {
      await core.clickAction(page, `toggle-${placement}-window`)
      expect(await core.isWindowVisible(page, placement)).beTrue()
      const isFloating = await core.isWindowFloating(page, placement)
      if (isFloating) await core.pinWindow(page, placement)
      expect(await core.isWindowPinned(page, placement)).beTrue()
      await core.maximizeWindow(page, placement)
      expect(await core.isWindowMaximized(page, placement)).beTrue()
      await core.restoreWindow(page, placement)
      expect(await core.isWindowPinned(page, placement)).beTrue()
      await core.closeWindow(page, placement)
      expect(await core.isWindowVisible(page, placement)).beFalse()
    }
  })

  it('check-fab', async () => {
    await core.clickPaneAction(page, 'top', 'fab')

    const bottomRightMatch = await runner.captureAndMatch('bottomRight')
    expect(bottomRightMatch).beTrue()

    await page.click('#toggle-bottom-left-fab')
    await page.waitForTimeout(500)
    const bottomLeftMatch = await runner.captureAndMatch('bottomLeft')
    expect(bottomLeftMatch).beTrue()

    await page.click('#toggle-top-left-fab')
    await page.waitForTimeout(500)
    const topLeftMatch = await runner.captureAndMatch('topLeft')
    expect(topLeftMatch).beTrue()

    await page.click('#toggle-top-right-fab')
    await page.waitForTimeout(500)
    const topRightFab = await runner.captureAndMatch('topRight')
    expect(topRightFab).beTrue()
  });

  it('check-stickies', async () => {
    await core.clickPaneAction(page, 'top', 'sticky')

    const noRibbonsMatch = await runner.captureAndMatch('noRibbons')
    expect(noRibbonsMatch).beTrue()

    await page.click('#toggle-top-left-ribbon')
    await page.click('#toggle-top-right-ribbon')
    await page.waitForTimeout(500)

    const halfRibbonsMatch = await runner.captureAndMatch('halfRibbons')
    expect(halfRibbonsMatch).beTrue()

    await page.click('#toggle-bottom-left-ribbon')
    await page.click('#toggle-bottom-right-ribbon')
    await page.waitForTimeout(500)

    const allRibbonsMatch = await runner.captureAndMatch('allRibbons')
    expect(allRibbonsMatch).beTrue()
  });

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
