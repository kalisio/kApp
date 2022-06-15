import { core } from '@kalisio/kdk/test.client.js'

export async function createDocument (page, document, wait = 1000) {
  await core.clickAction(page, 'create-document')
  await core.type(page, '#name-field', document.name)
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
