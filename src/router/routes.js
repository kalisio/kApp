module.exports = {
  '/': {
    name: 'index',
    component: 'Index',
    // By default all child routes are considered unauthenticated,
    // will be overriden when required
    meta: { unauthenticated: true },
    children: {
      login: 'authentication/KLogin',
      logout: {
        component: 'authentication/KLogout',
        meta: { authenticated: true }
      },
      register: 'authentication/KRegister',
      'change-endpoint': 'authentication/KChangeEndpoint',
      home: {
        // The name of the route has to be set the default child
        name: '',
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false },
        children: {
          'default-home-view': {
            // Because this child is the default one path is empty and name is the one of the parent route
            path: '',
            name: 'home',
            redirect: { name: 'collection-activity', params: { page: 'list' } }
          },
          'account/:page': {
            name: 'account-activity',
            component: 'account/KAccountActivity',
            props: true
          },
          layout: {
            name: 'layout-activity',
            component: 'LayoutActivity'
          },
          'collection/:page': {
            name: 'collection-activity',
            component: 'CollectionActivity',
            props: true,
            children: {
              create: {
                name: 'create-document',
                component: 'editor/KModalEditor',
                props: true
              },
              ':objectId/edit': {
                name: 'edit-document',
                component: 'editor/KModalEditor',
                props: true
              },
              ':objectId/view': {
                name: 'view-document',
                component: 'viewer/KModalViewer',
                props: true
              }
            }
          },
          kanban: {
            name: 'kanban-activity',
            component: 'KanbanActivity'
          },
          editor: {
            name: 'editor-activity',
            component: 'EditorActivity',
            children: {
              edit: {
                name: 'edit-object',
                component: 'editor/KModalEditor',
                props: true
              },
              view: {
                name: 'view-object',
                component: 'viewer/KModalViewer',
                props: true
              }
            }
          }
        }
      }
    }
  },
  '*': 'Error404'
}
