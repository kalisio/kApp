// Application hooks that run for every service
import { permissions as corePermissions, hooks as coreHooks } from '@kalisio/kdk/core.client'
import * as permissions from '../common/permissions.mjs'

// Default rules for all users
corePermissions.defineAbilities.registerHook(corePermissions.defineUserAbilities)
// Then rules for app
corePermissions.defineAbilities.registerHook(permissions.defineUserAbilities)

export default {
  before: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [coreHooks.log, coreHooks.emit],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
