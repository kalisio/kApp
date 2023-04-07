/* eslint-disable no-unused-expressions */

import { expect } from 'chai'
import { core } from '@kalisio/kdk/test.client.js'

const suite = 'layout'

describe(suite, () => {
  let runner
  let page
  let user
  const placements = ['left', 'top', 'right', 'bottom']

  before(async () => {
    runner = new core.Runner(suite, {
      appName: 'kapp',
      browser: {
        args: ['--lang=fr'],
        slowMo: 2
      }
    })
    page = await runner.start()
    user = {
      email: 'kalisio@kalisio.xyz',
      password: 'Pass;word1'
    }
    await core.login(page, user)
  })

  it('check-header-footer', async () => {
    expect(await core.isHeaderVisible(page)).be.true
    expect(await core.isFooterVisible(page)).be.false
    await core.clickAction(page, 'toggle-header')
    expect(await core.isHeaderVisible(page)).be.false
    await core.clickAction(page, 'toggle-footer')
    expect(await core.isFooterVisible(page)).be.true
  })

  it('check-panes', async () => {
    await core.clickPaneAction(page, 'top', 'panes')
    expect(await core.isPaneVisible(page, 'top')).be.true
    expect(await core.isPaneVisible(page, 'right')).be.false
    expect(await core.isPaneVisible(page, 'bottom')).be.false
    expect(await core.isPaneVisible(page, 'left')).be.false
    await core.clickAction(page, 'toggle-top-pane')
    expect(await core.isPaneVisible(page, 'top')).be.false
    await core.clickAction(page, 'toggle-right-pane')
    expect(await core.isPaneVisible(page, 'right')).be.true
    await core.clickAction(page, 'toggle-bottom-pane')
    expect(await core.isPaneVisible(page, 'bottom')).be.true
    await core.clickAction(page, 'toggle-left-pane')
    expect(await core.isPaneVisible(page, 'left')).be.true
  })

  it('check-windows', async () => {
    await core.clickPaneAction(page, 'top', 'windows')
    for (const placement of placements) {
      expect(await core.isWindowVisible(page, placement)).be.false
    }
    for (const placement of placements) {
      await core.clickAction(page, `toggle-${placement}-window`)
      expect(await core.isWindowVisible(page, placement)).be.true
      const isFloating = await core.isWindowFloating(page, placement)
      if (isFloating) await core.pinWindow(page, placement)
      expect(await core.isWindowPinned(page, placement)).be.true
      await core.maximizeWindow(page, placement)
      expect(await core.isWindowMaximized(page, placement)).be.true
      await core.restoreWindow(page, placement)
      expect(await core.isWindowPinned(page, placement)).be.true
      await core.closeWindow(page, placement)
      expect(await core.isWindowVisible(page, placement)).be.false
    }
  })

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
