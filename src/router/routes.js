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
            component: 'activity/KSwitch',
            props: true
          },
          'layout-demo': {
            name: 'layout-activity',
            component: 'LayoutActivity'
          },
          'collection-demo/:page': {
            name: 'collection-activity',
            component: 'activity/KSwitch',
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
          'kanban-demo': {
            name: 'kanban-activity',
            component: 'Kanban',
            props: true
          }
        }
      }
    }
  },
  '*': 'Error404'
}
