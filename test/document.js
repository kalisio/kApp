import { core } from '@kalisio/kdk/test.client'

export async function createDocument (page, name, wait = 1000) {
  await core.clickAction(page, 'create-document')
  await core.type(page, '#name-field', name)
  await core.clickAction(page, 'apply-button', 1000)
}

export async function deleteDocumentItem (page, name, wait = 1000) {
  await core.clickItemAction(page, name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)')
}

export async function deleteDocumentCard (page, name, wait = 1000) {
  await core.clickCardAction(page, name, 'overflow-menu')
  await core.clickAction(page, 'delete-document')
  await core.click(page, '.q-dialog button:nth-child(2)')
}
