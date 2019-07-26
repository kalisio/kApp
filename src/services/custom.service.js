import _ from 'lodash'

export default function (name, api, options) {
  let object = {
    KTextField: 'KTextField',
    KTextareaField: "KTextareaField",
    KAttachmentField: { "name": "KAttachmentField", "color": "primary" },
    KChipsField: ["KChipsField-1","KChipsField-2"],
    KChipsWithIconField: [{ "value": "KChipsWithIconField", "icon" : { "name" : "check","color" : "primary" } }],
    KDatetimeField: "2019-07-16",
    KEmailField: "kalisio@kalisio.xyz",
    KIconField: { "name": "check", "color": "primary" },
    KItemField: { "name": "KItemField", "services": "documents", "color": "dark" },
    KNumberField: "0123456789",
    KOptionsField: 'KOptionsField',
    KPasswordField: "KPasswordField",
    KPhoneField: "+0123456789",
    KSelectField: 'KSelectField1',
    KTagField: [{ "value": "KTagField", "scope": "documents", "icon" : { "name" : "check", "color" : "primary" } }],
    KToggleField: true,
    KUrlField: "Kalisio.com"
  }

  return {

    async get (id) {
      return _.clone(object)
    },

    async patch (id, data) {
      _.forOwn(data, (value, key) => {
        _.set(object, key, value)
      })
    }

    //api.getService('custom').patch('object', { name: 'toto' })
    //const object = api.getService('custom').get('object')
  }
}