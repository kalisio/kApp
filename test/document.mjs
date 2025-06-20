import { core } from './kdk/index.mjs'

async function selectFirstOption (page, selector) {
  await page.click(selector)
  await core.waitForTimeout(200)
  await page.keyboard.press('ArrowDown')
  await core.waitForTimeout(200)
  await page.keyboard.press('Enter')
  await core.waitForTimeout(500)
}

export async function createDocument (page, document, wait = 1000) {
  await core.clickAction(page, 'create-document')
  await core.type(page, '#name-field', document.name)
  await selectFirstOption(page, '#status-field')
  await selectFirstOption(page, '#genre-field')
  await selectFirstOption(page, '#espece-field')
  await selectFirstOption(page, '#etat_sani-field')
  await selectFirstOption(page, '#etat_meca-field')
  await selectFirstOption(page, '#forme-field')
  await core.clickAction(page, 'apply-button', wait)
}

export async function deleteDocumentItem (page, document, wait = 1000) {
  await core.clickItemAction(page, 'collection/KItem', document.name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)', wait)
}

export async function deleteDocumentCard (page, document, wait = 1000) {
  await core.clickItemAction(page, 'collection/KCard', document.name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)', wait)
}
