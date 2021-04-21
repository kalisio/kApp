import { Selector } from 'testcafe'
import { BaseCollection } from './core'

export default class Documents extends BaseCollection {
  constructor (collection, type, layout) {
    super(collection, type)
    this.layout = layout
    // create dialog
    this.nameField = Selector('.q-dialog').find('#name-field')
    this.createButton = Selector('.q-dialog').find('#apply-button')
  }

  async create (test, document) {
    await this.layout.clickFab(test, 'create-document')
    await test
      .typeText(this.nameField, document.name, { replace: true })
      .click(this.createButton)
      .wait(500)
  }

  async delete (test, document) {
    await this.clickMenuEntry(test, document.name, 'overflow-menu', 'delete-document')
    await test
      .wait(500)
      .click(Selector('.q-dialog').find('.q-btn').nth(1))
  }
}
