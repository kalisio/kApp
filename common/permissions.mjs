import _ from 'lodash'

export const Roles = {
  superadmin: 0
}

export const RoleNames = ['superadmin']

// Hook to manage app permissions
export function defineUserAbilities (subject, can, cannot, app) {
  if (subject && subject._id) {
    can('service', 'messages')
    can('all', 'messages')
    can('service', 'documents')
    can('all', 'documents')
    can('service', 'storage')
    can('all', 'storage')
    can('all', 'tags')
    can(
      [
        'createMultipartUpload',
        'completeMultipartUpload',
        'uploadPart',
        'putObject'
      ],
      'storage'
    )
    if (subject.permissions) {
      const roles = Array.isArray(subject.permissions)
        ? subject.permissions
        : [subject.permissions]
      roles.forEach((role) => {
        // Process app-related roles only
        if (!_.has(Roles, role)) return
        // Map from name to ID
        role = Roles[role]
        // Full access to superadmin
        if (role >= Roles.superadmin) {
          can('manage', 'all')
        }
      })
    }
  }
}
