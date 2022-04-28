// Application hooks that run for every service
import fuzzySearch from 'feathers-mongodb-fuzzy-search'
import commonHooks from 'feathers-hooks-common'
import { permissions as corePermissions, hooks as coreHooks } from '@kalisio/kdk/core.api.js'
import authentication from '@feathersjs/authentication'
const { authenticate } = authentication.hooks

// Default rules for all users
function defineUserAbilities (subject, can, cannot) {
  can('service', 'documents')
  can('all', 'documents')
}

corePermissions.defineAbilities.registerHook(corePermissions.defineUserAbilities)
corePermissions.defineAbilities.registerHook(defineUserAbilities)

export default {
  before: {
    all: [coreHooks.log,
      // We skip authentication in some cases
      commonHooks.when(hook => {
        // First built-in Feathers services like authentication
        if (typeof hook.service.getPath !== 'function') return false
        // Then user creation
        if ((hook.service.name === 'users') && (hook.method === 'create')) return false
        // If not exception perform authentication
        return true
      }, authenticate('jwt')),
      coreHooks.processObjectIDs,
      coreHooks.authorise],
    find: [fuzzySearch(), coreHooks.marshallCollationQuery],
    get: [],
    create: [],
    update: [coreHooks.preventUpdatePerspectives],
    patch: [],
    remove: []
  },

  after: {
    all: [coreHooks.log, coreHooks.processPerspectives],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [coreHooks.log],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
