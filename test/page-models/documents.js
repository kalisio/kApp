import { Selector } from 'testcafe'
import { Layout } from './core'

export default class Documents extends Layout {
  constructor (layout) {
    super()
    this.layout = layout
    // list
    this.nameField = Selector('.q-dialog').find('#name-field')
    this.createButton = Selector('.q-dialog').find('#apply-button')
    this.firstListItemOverflowMenu = Selector('.q-list').find('.q-btn').nth(0)
    this.overflowMenuDeleteEntry = Selector('.q-menu').find('.q-item').nth(1)
  }

  async create (test, values) {
    await this.layout.clickFab(test, '#create-document')
    await test
      .typeText(this.nameField, values.name, { replace: true })
      .click(this.createButton)
      .wait(500)
  }

  async delete (test) {
    await test
      .click(this.firstListItemOverflowMenu)
      .wait(500)
      .click(this.overflowMenuDeleteEntry)
      .wait(500)
  }
}
