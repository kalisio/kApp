/* eslint-disable no-unused-expressions */

import chai, { util, expect } from 'chai'
import chailint from 'chai-lint'
import { core } from '@kalisio/kdk/test.client.js'

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
        args: ['--lang=fr'],
        slowMo: 2
      },
      localStorage: {
        'k-app-welcome': false,
        'k-app-install': false
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
    expect(await core.isHeaderVisible(page)).beTrue()
    expect(await core.isFooterVisible(page)).beFalse()
    await core.clickAction(page, 'toggle-header')
    expect(await core.isHeaderVisible(page)).beFalse()
    await core.clickAction(page, 'toggle-footer')
    expect(await core.isFooterVisible(page)).beTrue()
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
    await core.clickAction(page, 'toggle-bottom-pane')
    expect(await core.isPaneVisible(page, 'bottom')).beTrue()
    await core.clickAction(page, 'toggle-left-pane')
    expect(await core.isPaneVisible(page, 'left')).beTrue()
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

  after(async () => {
    await core.logout(page)
    await runner.stop()
  })
})
