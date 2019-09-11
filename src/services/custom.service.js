import _ from 'lodash'

export default function (name, api, options) {
  const object = {
    KTextField: 'Lorem ipsum',
    KTextareaField: 'Post hoc impie perpetratum quod in aliis quoque iam timebatur, tamquam licentia crudelitati indulta per suspicionum nebulas aestimati quidam noxii damnabantur. quorum pars necati, alii puniti bonorum multatione actique laribus suis extorres nullo sibi relicto praeter querelas et lacrimas, stipe conlaticia victitabant, et civili iustoque imperio ad voluntatem converso cruentam, claudebantur opulentae domus et clarae.',
    KAttachmentField: { name: 'An attachment file' },
    KChipsWithIconField: [{ value: 'A chips', icon: { name: 'check', color: 'secondary' }}, { value: 'Another chips', icon: { name: 'layers', color: 'blue' }}],
    KEmailField: 'kalisio@kalisio.xyz',
    KIconField: { name: 'check', color: 'orange' },
    KItemField: { name: 'An item', services: 'documents', color: 'lime' },
    KNumberField: '0123456789',
    KOptionsField: 'option1',
    KPasswordField: 'a password',
    KPhoneField: '+0123456789',
    KSelectField: 'option2',
    KTagField: [{ value: 'A tag', scope: 'documents', icon: { name: 'home', color: 'tea' }}, { value: 'Another tag', scope: 'documents', icon: { name: 'tree', color: 'green' }}],
    KToggleField: true,
    KUrlField: 'https://kalisio.com'
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
  }
}
