const tours = require('../tours')

module.exports = [{
  path: '/:token?',
  name: 'index',
  component: 'Index',
  meta: { unauthenticated: true },
  children: {
    terms: 'app/KTerms',
    login: 'screen/KLoginScreen',
    logout: {
      component: 'screen/KLogoutScreen',
      meta: { authenticated: true }
    },
    register: 'screen/KRegisterScreen',
    'send-reset-password': {
      component: 'account/KSendResetPassword'
    },
    'change-password': {
      component: 'account/KChangePassword',
      meta: { authenticated: true, unauthenticated: false }
    },
    home: {
      // The name of the route has to be set the default child
      name: '',
      component: 'app/KHome',
      meta: { authenticated: true, unauthenticated: false },
      children: {
        'default-home-view': {
          // Because this child is the default one path is empty and name is the one of the parent route
          path: '',
          name: 'home',
          redirect: { name: 'layout-activity' },
          tour: {
            home: tours.home,
            'side-nav': tours['side-nav']
          },
        },
        layout: {
          name: 'layout-activity',
          component: 'LayoutActivity'
        },
        miscellaneous: {
          name: 'miscellaneous-activity',
          component: 'MiscellaneousActivity'
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
            'edit/:objectId': {
              name: 'edit-document',
              component: 'editor/KModalEditor',
              props: true
            },
            'view/:objectId': {
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
        chart: {
          name: 'chart-activity',
          component: 'ChartActivity'
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
        }, 
        webpush: {
          name: 'webpush-activity',
          component: 'WebpushActivity'
        }
      }
    }
  }
},
// Always leave this as last one,
// but you can also remove it
{
  path: '/:catchAll(.*)*',
  component: 'screen/KErrorScreen'
}
]
