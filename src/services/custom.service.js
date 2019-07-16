import _ from 'lodash'

export default function (name, api, options) {
  let object = {
    KTextField: 'KTextField',
    KTextareaField: "KTextareaField",
    KAttachmentField: "KAttachmentField",
    KChipsField: ["KChipsField"],
    KChipsWithIconField: [{ "name": "KChipsWithIconField-1", "color": "dark" }, { "name": "KChipsWithIconField-2", "color": "dark" }], //"KChipsWithIconField",
    KDatetimeField: "2019-07-16",
    KEmailField: "kalisio@kalisio.xyz",
    KIconField: { "name": "check", "color": "dark" },
    KItemField: { "name": "check", "color": "dark" },
    KNumberField: "0123456789",
    KPasswordField: "KPasswordField",
    KPhoneField: "0123456789",
    KTagField: "KTagField",
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