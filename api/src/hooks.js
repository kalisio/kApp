// Application hooks that run for every service
import commonHooks from 'feathers-hooks-common'
import { permissions as corePermissions, hooks as coreHooks } from '@kalisio/kdk/core.api.js'
import * as permissions from '../../common/permissions.mjs'
import authentication from '@feathersjs/authentication'
const { authenticate } = authentication.hooks

// Default rules for all users
corePermissions.defineAbilities.registerHook(corePermissions.defineUserAbilities)
// Then rules for app
corePermissions.defineAbilities.registerHook(permissions.defineUserAbilities)

export default {
  before: {
    all: [coreHooks.log,
      // We skip authentication in some cases
      commonHooks.when(hook => {
        // First built-in Feathers services like authentication
        if (typeof hook.service.getPath !== 'function') return false
        // Then user creation
        if ((hook.service.name === 'users') && (hook.method === 'create')) return false
        // The email verification
        if ((hook.service.name === 'account') && (hook.method === 'verifyEmail')) return false
        // Password reset
        if ((hook.service.name === 'account') && (hook.data.action !== 'passwordChange')) return false
        // If not exception perform authentication
        return true
      }, authenticate('jwt')),
      coreHooks.processObjectIDs,
      coreHooks.authorise],
    find: [coreHooks.marshallCollationQuery],
    get: [],
    create: [],
    // We only use pacth in editors to avoid dumping "hidden" (ie internal) properties
    update: [commonHooks.disallow()],
    patch: [],
    remove: []
  },

  after: {
    all: [coreHooks.log],
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
