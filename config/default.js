const website = 'https://kalisio.com'

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'

let domain
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  domain = 'https://kapp.dev.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  domain = 'https://kapp.test.kalisio.xyz'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  domain = 'https://kapp.kalisio.xyz'
} else {
  // Otherwise we are on a developer machine
  if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:' + clientPort
  } else {
    domain = 'http://localhost:' + serverPort
  }
}

const leftPane = {
  content: [
    { component: 'KLogo' },
    { component: 'account/KIdentityPanel', class: 'full-width' },
    { id: 'layout', icon: 'las la-desktop', label: 'LayoutActivity.LABEL', renderer: 'item', route: { name: 'layout-activity' } },
    { id: 'miscellaneous', icon: 'las la-icons', label: 'MiscellaneousActivity.LABEL', renderer: 'item', route: { name: 'miscellaneous-activity' } },
    { id: 'collection', icon: 'las la-list', label: 'CollectionActivity.LABEL', renderer: 'item', route: { name: 'collection-activity', params: { page: 'list' } } },
    { id: 'kanban', icon: 'dashboard', label: 'KanbanActivity.LABEL', renderer: 'item', route: { name: 'kanban-activity' } },
    { id: 'chart', icon: 'las la-chart-pie', label: 'ChartActivity.LABEL', renderer: 'item', route: { name: 'chart-activity' } },
    { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', renderer: 'item', route: { name: 'editor-activity' } },
    { id: 'store', icon: 'las la-atom', label: 'StoreActivity.LABEL', renderer: 'item', route: { name: 'store-activity' } },
    { component: 'QSeparator' },
    { id: 'about', icon: 'las la-info', label: 'ABOUT', renderer: 'item', dialog: { component: 'app/KAbout', title: 'ABOUT', okAction: 'CLOSE' } },
    { component: 'QSeparator' },
    { id: 'logout', icon: 'las la-sign-out-alt', label: 'LOGOUT', renderer: 'item', route: { name: 'logout' } }
  ],
  opener: true,
  visible: false
}

const vSeparator = { component: 'QSeparator', vertical: true }

const collectionActions = [
  {
    id: 'view-document',
    icon: 'las la-glasses',
    tooltip: 'Documents.VIEW',
    scope: 'footer',
    handler: 'viewItem'
  },
  {
    id: 'edit-document',
    icon: 'las la-edit',
    tooltip: 'Documents.EDIT',
    scope: 'header',
    handler: { name: 'editItem', params: [] }
  },
  {
    id: 'export-document',
    icon: 'las la-download',
    tooltip: 'Documents.EXPORT',
    scope: 'footer',
    handler: 'exportItem'
  },
  {
    component: 'menu/KMenu',
    id: 'overflow-menu',
    scope: 'footer',
    dropdownIcon: 'las la-ellipsis-v',
    actionRenderer: 'item',
    content: [{
      id: 'delete-document',
      icon: 'las la-trash',
      label: 'Documents.DELETE',
      handler: { name: 'removeItem', params: ['confirm'] }
    }]
  }
]

const widgets = [
  { 
    id: 'widget-1', label: 'Widget 1', icon: 'las la-restore-windows',
    content: { component: 'layout/Widget1'}, 
    header: [{ id: 'title', component: 'KStamp', text: 'Widget 1 header' }] 
  }, 
  { 
    id: 'widget-2', label: 'Widget 2', content: { component: 'layout/Widget2'} 
  }, 
  { 
    id: 'widget-3', label: 'Widget 3', content: { component: 'layout/Widget3'} 
  }, 
  { 
    id: 'widget-4', label: 'Widget 4', content: { component: 'layout/Widget4'} 
  }
]

module.exports = {
  // Special alias to host loopback interface in cordova
  // domain: 'http://10.0.2.2:8081',
  // If using port forwarding
  // domain: 'http://localhost:8081',
  // If using local IP on WiFi router
  // domain: 'http://192.168.1.16:8081',
  domain,
  flavor: process.env.NODE_APP_INSTANCE || 'dev',
  version: require('../package.json').version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiJwt: 'kapp-jwt',
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  // appLogo: 'kapp-logo.png',
  appWebsite: 'https://github.com/kalisio/kApp',
  publisher: 'Kalisio',
  publisherWebsite: website,
  locale: {
    // If you'd like to force locale otherwise it is retrieved from browser
    // default: 'en',
    fallback: 'en'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  screens: {
    // header: 'screen/KScreenHeader',
    // footer: 'screen/KScreenFooter',
    // backgroundColor: '#FFF8ED',
    // textColor: 'white',
    actions: [{ 
      id: 'terms-policies', 
      label: 'screen.TERMS_AND_POLICIES', 
      dialog: {
        component: 'app/KTerms'
      }
    }],
    // frameBackgroundColor: '#FFDC9E',
    login: {
      actions: [
        { id: 'register-link', label: 'KLoginScreen.DONT_HAVE_AN_ACCOUNT_LABEL', route: { name: 'register' } },
        { id: 'keycloak-link', label: 'screen.LOGIN_WITH_KEYCLOAK', route: { url: '/oauth/keycloak' } }
      ]
    },
    logout: {
      actions: [
        { id: 'login-link', label: 'KLogoutScreen.LOG_IN_AGAIN_LABEL', route: { name: 'login' } }
      ]
    },
    register: {
      actions: [
        { id: 'login-link', label: 'KRegisterScreen.ALREADY_HAVE_AN_ACCOUNT_LABEL', route: { name: 'login' } }
      ]
    },
    endpoint: {
      actions: [
        { id: 'login-link', label: 'KEndpointScreen.LOG_IN_LABEL', route: { name: 'login' } }
      ]
    }
  },
  layout: {
    view: 'lHh LpR lFf',
    header: {
      content: [{ component: 'layout/Header' }],
      visible: true
    },
    page: {
      visible: true
    },
    fab: {
      visible: true
    }, 
    panes: {
      left: { opener: true },
      top: { opener: true, visible: true },
      right: { opener: true },
      bottom: { opener: true }
    }
  },
  accountActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        profile: [
          { id: 'profile', icon: 'las la-user', color: 'primary', label: 'KAccountActivity.PROFILE', disabled: true },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        security: [
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', color: 'primary', label: 'KAccountActivity.SECURITY', disabled: true },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        'danger-zone': [
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', color: 'primary', label: 'KAccountActivity.DANGER_ZONE', disabled: true }
        ]
      }
    }
  },
  layoutActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        page: [
          { id: 'page', label: 'Page', color: 'primary', disabled: true },
          { id: 'panes', label: 'Panes', handler: { name: 'setMode', params: ['panes'] } },
          { id: 'windows', label: 'Windows', handler: { name: 'setMode', params: ['windows'] } }
        ],
        panes: [
          { id: 'page', label: 'Page', handler: { name: 'setMode', params: ['page'] } },
          { id: 'panes', label: 'Panes', color: 'primary', disabled: true },
          { id: 'windows', label: 'Windows', handler: { name: 'setMode', params: ['windows'] } }
        ],
        windows: [
          { id: 'page', label: 'Page', handler: { name: 'setMode', params: ['page'] } },
          { id: 'panes', label: 'Panes', handler: { name: 'setMode', params: ['panes'] } },
          { id: 'windows', label: 'Windows', color: 'primary', disabled: true }
        ]
      }
    },
    rightPane: {
      content: [{ component: 'layout/RightPane' }],
      visible: false
    },
    bottomPane: {
      content: [{ component: 'layout/BottomPane' }],
      visible: false
    },
    page: {
      content: {
        page: [{ component: 'layout/Layout', mode: 'page' }],
        panes: [{ component: 'layout/Layout', mode: 'panes' }],
        windows: [{ component: 'layout/Layout', mode: 'windows' }]
      }
    },
    fab: {
      content: {
        page: [
          { id: 'page', label: 'Page', icon: 'las la-stream', handler: { name: 'setMode', params: ['page'] } },
          { id: 'panes', label: 'Panes', icon: 'las la-window-minimize', handler: { name: 'setMode', params: ['panes'] } },
          { id: 'windows', label: 'Windows', icon: 'las la-window-restore', handler: { name: 'setMode', params: ['windows'] } }
        ]
      }
    },
    windows: {
      left: { content: [widgets[0], widgets[1]], current: 'widget-1' },
      right: { content: [widgets[1]], current: 'widget-2' },
      top: { content: [widgets[2]], current: 'widget-3'},
      bottom: { content: [widgets[3]], current: 'widget-4' }
    }
  },
  miscellaneousActivity: {
    leftPane: leftPane,
    topPane: {
      content: [
        { id: 'layout', icon: 'las la-icons', label: 'MiscellaneousActivity.LABEL', color: 'primary', disabled: true }
      ]
    }
  },
  collectionActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        list: [
          { id: 'list', icon: 'las la-list', label: 'CollectionActivity.LIST', color: 'primary', disabled: true },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
          vSeparator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        grid: [
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', label: 'CollectionActivity.GRID', color: 'primary', disabled: true },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
          vSeparator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        table: [
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', label: 'CollectionActivity.TABLE', color: 'primary', disabled: true },
          vSeparator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'restoreTopPaneMode' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { component: 'collection/KFilter', size: '1rem' }
        ]
      }
    },
    page: {
      content: {
        list: [{
          component: 'collection/KList',
          ref: 'list',
          service: 'documents',
          renderer: {
            component: 'collection/KItem',
            actions: collectionActions
          }
          //, /*filterQuery: ':filter.query'
        }],
        grid: [{
          component: 'collection/KGrid',
          ref: 'grid',
          service: 'documents',
          renderer: {
            component: 'collection/KCard',
            actions: collectionActions
          }
          // , /*filterQuery: ':filter.query' 
        }],
        table: [{
          component: 'collection/KTable',
          ref: 'table',
          service: 'documents',
          itemActions: collectionActions,
          // filterQuery: ':filter.query', 
          nbItemsPerPage: 3,
          selection: 'multiple'
        }]
      }
    },
    fab: {
      content: [
        { id: 'create-document', icon: 'las la-plus', route: { name: 'create-document', params: { service: 'documents' } } }
      ]
    }
  },
  kanbanActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        default: [
          { id: 'table', icon: 'dashboard', label: 'KanbanActivity.LABEL', color: 'primary', disabled: true },
          { id: 'filter', icon: 'las la-search', tooltip: 'KanbanActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { component: 'collection/KFilter', size: '1rem' }
        ]
      }
    },
    categories: [
      { name: 'sain' },
      { name: 'malade' },
      { name: 'déclin' }
    ],
    categoryField: 'etat_sani'
  },
  chartActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        pie: [
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', color: 'primary', disabled: true },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', handler: { name: 'setTopPaneMode', params: ['bar'] } },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', handler: { name: 'setTopPaneMode', params: ['line'] } }
        ],
        bar: [
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', handler: { name: 'setTopPaneMode', params: ['pie'] } },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', color: 'primary', disabled: true },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', handler: { name: 'setTopPaneMode', params: ['line'] } }
        ],
        line: [
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', handler: { name: 'setTopPaneMode', params: ['pie'] } },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', handler: { name: 'setTopPaneMode', params: ['bar'] } },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', color: 'primary', disabled: true }
        ]
      },
      mode: 'pie'
    }
  },
  editorActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        default: [
          { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', color: 'primary', disabled: true }
        ]
      }
    },
    fab: {
      actions: [
        { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.EDIT', route: { name: 'edit-object', params: { service: 'custom', objectId: '0' } } },
        { id: 'viewer', icon: 'las la-glasses', label: 'EditorActivity.VIEW', route: { name: 'view-object', params: { service: 'custom', objectId: '0' } } }
      ]
    }
  },
  storeActivity: {
    leftPane: leftPane,
  },
  routes: require('../src/router/routes')
}
