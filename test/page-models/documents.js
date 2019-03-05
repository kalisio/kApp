import { Selector } from 'testcafe'
import VueSelector from 'testcafe-vue-selectors'
import ApplicationLayout from './layout'

export default class Documents extends ApplicationLayout {
    constructor () {
      super()
      //input
      this.idArbre = VueSelector('k-text-field').nth(0)
      this.status = VueSelector('k-select-field').nth(0)
      this.genre = VueSelector('k-select-field').nth(1)
      this.espece = VueSelector('k-select-field').nth(2)
      this.etats = VueSelector('k-select-field').nth(3)
      this.etatm = VueSelector('k-select-field').nth(4)
      this.forme = VueSelector('k-select-field').nth(5)
      this.obsv = VueSelector('k-text-field').nth(1)
      this.create = Selector('#apply-button')

      //list
      this.firstElement = Selector('#item-overflow-menu-entry').nth(0)
      this.supr = Selector('#Supprimer')



    }
    async createNew(test) {
        
        await this.openAndClickFab(test, '#create-document')
        await test
        .typeText(this.idArbre, '1', {replace: true})
        await test
        .click(this.status)
        .click(VueSelector('k-select-field').nth(1))
 /*       //.wait(500)
        await test
        .click(this.genre)
        .wait(50)
        .click(VueSelector('k-select-field').nth(1))
        //.typeText(this.obsv, 'vue', {replace: true})
        //.wait(500)*/
        .click(this.create)
        .wait(500)
        
        
    }

    async delete(test){
      await test
        .click(this.firstElement)
        .wait(500)
        .click(this.supr)
        .wait(500)
    }
}