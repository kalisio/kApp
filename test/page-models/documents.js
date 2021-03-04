import { Selector } from 'testcafe'
import { Layout } from './core'

export default class Documents extends Layout {
  constructor (layout) {
    super()
    this.layout = layout
    // list
    this.nameField = Selector('.q-dialog').find('#name-field')
    this.createButton = Selector('.q-dialog').find('#apply-button')
  }

  async create (test, values) {
    await this.layout.clickFab(test, '#create-document')
    await test
      .typeText(this.nameField, values.name, { replace: true })
      .click(this.createButton)
      .wait(500)
  }

  async delete (test, name) {
    await test
      .click(Selector('.q-item').withText(name).find('.q-btn').nth(0))
      .wait(500)
      .click(Selector('#delete-document'))
      .wait(500)
  }
}
