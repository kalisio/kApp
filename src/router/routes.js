const tours = require('../tours')

module.exports = [{
  path: '/:token?',
  name: 'index',
  component: 'Index',
  meta: { unauthenticated: true },
  children: {
    login: 'screen/KLoginScreen',
    'logout/:provider?': {
      name: 'logout',
      component: 'screen/KOAuthLogoutScreen',
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
          redirect: { name: 'screen-activity' },
          tour: {
            home: tours.home,
            'side-nav': tours['side-nav']
          }
        },
        screen: {
          name: 'screen-activity',
          component: 'screen/ScreenActivity'
        },
        'layout/:mode': {
          name: 'layout-activity',
          component: 'layout/LayoutActivity',
          props: true
        },
        'components/:mode': {
          name: 'components-activity',
          component: 'components/ComponentsActivity',
          props: true
        },
        'document/:type': {
          name: 'document-activity',
          component: 'document/DocumentActivity',
          props: true
        },
        messages: {
          name: 'messages-activity',
          component: 'messages/MessagesActivity'
        },
        'collection/:page': {
          name: 'collection-activity',
          component: 'collection/CollectionActivity',
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
        board: {
          name: 'board-activity',
          component: 'board/BoardActivity'
        },
        chart: {
          name: 'chart-activity',
          component: 'chart/ChartActivity'
        },
        editor: {
          name: 'editor-activity',
          component: 'editor/EditorActivity',
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
          component: 'webpush/WebpushActivity'
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
