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
    { component: 'QImg', src: 'statics/kapp-logo.png' },
    { component: 'account/KIdentityPanel', class: 'full-width' },
    { id: 'layout', icon: 'las la-desktop', label: 'LayoutActivity.LABEL', renderer: 'item', route: { name: 'layout-activity' } },
    { id: 'collection', icon: 'las la-list', label: 'CollectionActivity.LABEL', renderer: 'item', route: { name: 'collection-activity', params: { page: 'list' } } },
    { id: 'kanban', icon: 'dashboard', label: 'KanbanActivity.LABEL', renderer: 'item', route: { name: 'kanban-activity' } },
    { id: 'chart', icon: 'las la-chart-pie', label: 'ChartActivity.LABEL', renderer: 'item', route: { name: 'chart-activity' } },
    { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', renderer: 'item', route: { name: 'editor-activity' } },
    { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px; max-height: 1px;' },
    { component: 'layout/KAbout' },
    { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px; max-height: 1px;' },
    { id: 'logout', icon: 'las la-sign-out-alt', label: 'LOGOUT', renderer: 'item', route: { name: 'logout' } }
  ]
}

const separator = { component: 'QSeparator', vertical: true, color: 'lightgrey' }

const collectionActions = [
  {
    id: 'view-document',
    icon: 'las la-glasses',
    tooltip: 'Documents.VIEW',
    handler: 'viewItem'
  },
  {
    id: 'edit-document',
    icon: 'las la-edit',
    tooltip: 'Documents.EDIT',
    handler: { name: 'editItem', params: [] }
  },
  {
    id: 'export-document',
    icon: 'las la-download',
    tooltip: 'Documents.EXPORT',
    handler: 'exportItem'
  },
  {
    component: 'frame/KPopupAction',
    id: 'overflow-menu',
    actionRenderer: 'item',
    content: [{
      id: 'delete-document',
      icon: 'las la-trash',
      label: 'Documents.DELETE',
      handler: { name: 'removeItem', params: ['confirm'] }
    }]
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
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  appLogo: 'kapp-icon.png',
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
    extraLinks: [
      { label: 'screen.ABOUT_KALISIO', url: website },
      { label: 'screen.CONTACT', url: website + '/contact' },
      { label: 'screen.TERMS_AND_POLICIES', url: domain + '/#/terms' }
    ],
    banner: 'kapp-logo.png',
    login: {
      providers: ['google', 'github'],
      links: [
        { id: 'register-link', label: 'KLogin.DONT_HAVE_AN_ACCOUNT_LINK', route: { name: 'register' } }
      ]
    },
    logout: {
      links: [
        { id: 'login-link', label: 'KLogout.LOG_IN_AGAIN_LINK', route: { name: 'login' } }
      ]
    },
    register: {
      links: [
        { id: 'login-link', label: 'KRegister.ALREADY_HAVE_AN_ACCOUNT_LINK', route: { name: 'login' } }
      ]
    }
  },
  layout: {
    view: 'lHh LpR lFf',
    topPane: {
      opener: true,
      visible: true
    },
    leftPane: {
      opener: true
    },
    rightPane: {
      opener: true
    },
    bottomPane: {
      opener: true
    }
  },
  accountActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        profile: [
          { id: 'profile', icon: 'las la-user', color: 'primary', size: '1rem', label: 'KAccountActivity.PROFILE', disabled: true },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', size: '1rem', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', size: '1rem', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        security: [
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', size: '1rem', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', color: 'primary', label: 'KAccountActivity.SECURITY', size: '1rem', disabled: true },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', size: '1rem', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        'danger-zone': [
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', size: '1rem', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', size: '1rem', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', color: 'primary', label: 'KAccountActivity.DANGER_ZONE', size: '1rem', disabled: true }
        ]
      }
    }
  },
  layoutActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        default: [
          { id: 'layout', icon: 'las la-desktop', label: 'LayoutActivity.LABEL', color: 'primary', size: '1rem', disabled: true }
        ]
      }
    },
    rightPane: {
      content: [
        { component: 'Platform' }
      ]
    },
    bottomPane: {
      content: [
        { component: 'Platform' }
      ]
    }
  },
  collectionActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        list: [
          { id: 'list', icon: 'las la-list', label: 'CollectionActivity.LIST', color: 'primary', size: '1rem', disabled: true },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', size: '1rem', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', size: '1rem', route: { name: 'collection-activity', params: { page: 'table' } } },
          separator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', size: '1rem', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        grid: [
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', size: '1rem', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', label: 'CollectionActivity.GRID', color: 'primary', size: '1rem', disabled: true },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', size: '1rem', route: { name: 'collection-activity', params: { page: 'table' } } },
          separator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', size: '1rem', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        table: [
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', size: '1rem', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', size: '1rem', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', label: 'CollectionActivity.TABLE', size: '1rem', color: 'primary', disabled: true },
          separator,
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', size: '1rem', handler: { name: 'setTopPaneMode', params: ['filter'] } },
          { component: 'collection/KSorter' }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', size: '1rem', handler: { name: 'restoreTopPaneMode' } },
          { component: 'QSeparator', vertical: true, size: '1rem', color: 'lightgrey' },
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
          /*, /*filterQuery: ':filter.query' */
        }],
        grid: [{
          component: 'collection/KGrid',
          ref: 'grid',
          service: 'documents',
          renderer: {
            component: 'collection/KCard',
            actions: collectionActions
          }
          /* , /*filterQuery: ':filter.query' */
        }],
        table: [{
          component: 'collection/KTable',
          ref: 'table',
          service: 'documents',
          itemActions: collectionActions,
          /* filterQuery: ':filter.query', */
          nbItemsPerPage: 3,
          selection: 'multiple'
        }]
      }
    },
    fab: {
      actions: [
        { id: 'create-document', icon: 'las la-plus', route: { name: 'create-document', params: { service: 'documents' } } }
      ]
    }
  },
  kanbanActivity: {
    leftPane: leftPane,
    topPane: {
      content: {
        default: [
          { id: 'table', icon: 'dashboard', label: 'KanbanActivity.LABEL', color: 'primary', size: '1rem', disabled: true },
          { id: 'filter', icon: 'las la-search', tooltip: 'KanbanActivity.FILTER', size: '1rem', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', size: '1rem', handler: { name: 'setTopPaneMode', params: ['default'] } },
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
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', color: 'primary', size: '1rem', disabled: true },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', handler: { name: 'setTopPaneMode', params: ['bar'] } },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', handler: { name: 'setTopPaneMode', params: ['line'] } }
        ],
        bar: [
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', handler: { name: 'setTopPaneMode', params: ['pie'] } },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', color: 'primary', size: '1rem', disabled: true },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', handler: { name: 'setTopPaneMode', params: ['line'] } }
        ],
        line: [
          { id: 'pie', icon: 'las la-chart-pie', label: 'ChartActivity.PIE', handler: { name: 'setTopPaneMode', params: ['pie'] } },
          { id: 'bar', icon: 'las la-chart-bar', label: 'ChartActivity.BAR', handler: { name: 'setTopPaneMode', params: ['bar'] } },
          { id: 'line', icon: 'las la-chart-line', label: 'ChartActivity.LINE', color: 'primary', size: '1rem', disabled: true }
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
          { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', color: 'primary', size: '1rem', disabled: true }
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
  routes: require('../src/router/routes')
}
