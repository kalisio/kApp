import _ from 'lodash'

export default function (name, api, options) {
  let object = {
    name: 'MyName'
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