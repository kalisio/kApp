module.exports = {
  '/' : {
    name: 'index',
    component: 'Index',
    // By default all child routes are considered unauthenticated,
    // will be overriden when required
    meta: { unauthenticated: true },
    children: {
      'login': 'authentication/KLogin',
      'logout': {
        component: 'authentication/KLogout',
        meta: { authenticated: true }
      },
      'register': {
        component: 'authentication/KRegister',
        meta: { authenticated: true }
      },
      'change-endpoint': 'authentication/KChangeEndpoint',
      children: {
        // The name of the route has to be set the default child
        name: '',
        component: 'layout/KHome',
        meta: { authenticated: true, unauthenticated: false },
        children: {
          'default-home-view': {
            // Because this child is the default one path is empty and name is the one of the parent route
            path: '',
            name: 'home',
            redirect: { name: 'main' }
          },
          'main': {
            path: 'main',
            component: 'MainActivity'
          }
        }
      }
    }
  },
  '*': 'Error404'
}
