import commonHooks from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk/core.api.js'

export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(commonHooks.isProvider('external'), coreHooks.preventChanges(true, ['permissions']))
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
