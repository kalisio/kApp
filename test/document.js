import { core } from '@kalisio/kdk/test.client'

export async function createDocument (page, name, wait = 2000) {
  await core.clickAction(page, 'create-document')
  await core.type(page, '#name-field', name)
  await core.clickAction(page, 'apply-button', 1000)
}

export async function deleteDocumentItem (page, name, wait = 2000) {
  await core.clickItemAction(page, 'collection/KItem', name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)')
}

export async function deleteDocumentCard (page, name, wait = 2000) {
  await core.clickItemAction(page, 'collection/KCard', name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)')
}
