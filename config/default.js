const website = 'https://www.kalisio.com'

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
      { label: 'screen.CONTACT', url: website + '/#footer' },
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
    leftDrawer: {
      content: [
        { component: 'QImg', src: 'statics/kapp-logo.png' },
        { component: 'account/KIdentityPanel', class: 'full-width' },
        { id: 'layout', icon: 'las la-desktop', label: 'SideNav.LAYOUT_ACTIVITY', renderer: 'item', route: { name: 'layout-activity' } },
        { id: 'collection', icon: 'las la-list', label: 'SideNav.COLLECTION_ACTIVITY', renderer: 'item', route: { name: 'collection-activity', params: { page: 'list' } } },
        { id: 'kanban', icon: 'dashboard', label: 'SideNav.KANBAN_ACTIVITY', renderer: 'item', route: { name: 'kanban-activity' } },
        { id: 'editor', icon: 'las la-edit', label: 'SideNav.EDITOR_ACTIVITY', renderer: 'item', route: { name: 'editor-activity' } },
        { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
        { component: 'layout/KAbout' },
        { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
        { id: 'logout', icon: 'las la-sign-out-alt', label: 'SideNav.LOGOUT', renderer: 'item', route: { name: 'logout' } }
      ],
      behavior: 'mobile',
      opener: true
    },
    topPane: {
      opener: true,
      visible: true
    },
    rightPane: {
      opener: true
    },
    bottomPane: {
      opener: true
    }
  },
  accountActivity: {
    topPane: {
      content: {
        profile: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'profile', icon: 'las la-user', color: 'primary', label: 'KAccountActivity.PROFILE', disabled: true },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        security: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', color: 'primary', label: 'KAccountActivity.SECURITY', disabled: true },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', tooltip: 'KAccountActivity.DANGER_ZONE', route: { name: 'account-activity', params: { page: 'danger-zone' } } }
        ],
        'danger-zone': [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'profile', icon: 'las la-user', tooltip: 'KAccountActivity.PROFILE', route: { name: 'account-activity', params: { page: 'profile' } } },
          { id: 'security', icon: 'las la-shield-alt', tooltip: 'KAccountActivity.SECURITY', route: { name: 'account-activity', params: { page: 'security' } } },
          { id: 'danger-zone', icon: 'las la-exclamation-triangle', color: 'primary', label: 'KAccountActivity.DANGER_ZONE', disabled: true }
        ]
      }
    }
  },
  layoutActivity: {
    topPane: {
      content: {
        default: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'layout', icon: 'las la-desktop', label: 'LayoutActivity.LABEL', color: 'primary', disabled: true }
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
    topPane: {
      content: {
        list: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'list', icon: 'las la-list', label: 'CollectionActivity.LIST', color: 'primary', disabled: true },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        grid: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', label: 'CollectionActivity.GRID', color: 'primary', disabled: true },
          { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        table: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
          { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
          { id: 'table', icon: 'las la-table', label: 'CollectionActivity.TABLE', color: 'primary', disabled: true },
          { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'restoreTopPaneMode' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { component: 'collection/KFilter', on: { event: 'filter-changed', listener: { name: 'onFilterChanged' } } }
        ]
      }
    },
    fab: {
      actions: [
        { id: 'create-document', icon: 'las la-plus', route: { name: 'create-document', params: { service: 'documents' } } }
      ]
    }
  },
  kanbanActivity: {
    topPane: {
      content: {
        default: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'table', icon: 'dashboard', label: 'KanbanActivity.LABEL', color: 'primary', disabled: true },
          { id: 'filter', icon: 'las la-search', tooltip: 'KanbanActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
        ],
        filter: [
          { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { component: 'collection/KFilter', on: { event: 'filter-changed', listener: { name: 'onFilterChanged' } } }
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
  editorActivity: {
    topPane: {
      content: {
        default: [
          { id: 'home', icon: 'las la-home', route: { name: 'home' } },
          { component: 'QSeparator', vertical: true, color: 'lightgrey' },
          { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', color: 'primary', disabled: true },
          { id: 'editor', icon: 'las la-edit', tooltip: 'EditorActivity.EDIT', route: { name: 'edit-object', params: { service: 'custom', objectId: '0' } } },
          { id: 'viewer', icon: 'las la-glasses', tooltip: 'EditorActivity.VIEW', route: { name: 'view-object', params: { service: 'custom', objectId: '0' } } }
        ]
      }
    }
  },
  routes: require('../src/router/routes')
}
