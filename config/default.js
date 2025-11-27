const leftPane = require('./kdk/panes.left')
const helpers = require('./kdk/helpers')

const website = 'https://kalisio.com'

const serverPort = process.env.PORT || 8081
// Required to know webpack port so that in dev we can build correct URLs
const clientPort = process.env.CLIENT_PORT || 8080
const API_PREFIX = '/api'

let pwaName = 'kApp'
// If we build a specific staging instance
if (process.env.NODE_APP_INSTANCE === 'dev') {
  pwaName += ' (dev)'
} else if (process.env.NODE_APP_INSTANCE === 'test') {
  pwaName += ' (test)'
} else if (process.env.NODE_APP_INSTANCE === 'prod') {
  // Nothing to do
} else {
  // Otherwise we are on a developer machine
  pwaName += ' (localhost)'
}

const LEFT_PANE = {
  content: [
    { component: 'account/KProfile', class: 'full-width' },
    leftPane.activityLink({ name: 'screen', icon: 'las la-tv', label: 'ScreenActivity.LABEL' }),
    leftPane.activityLink({ name: 'layout', icon: 'las la-window-restore', label: 'LayoutActivity.LABEL', params: { mode: 'header-footer' } }),
    leftPane.activityLink({ name: 'components', icon: 'las la-code', label: 'ComponentsActivity.LABEL', params: { mode: 'text' } }),
    leftPane.activityLink({ name: 'document', icon: 'las la-icons', label: 'DocumentActivity.LABEL', params: { type: 'html' } }),
    leftPane.activityLink({ name: 'messages', icon: 'las la-comments', label: 'MessagesActivity.LABEL' }),
    leftPane.activityLink({ name: 'collection', icon: 'las la-list', label: 'CollectionActivity.LABEL', params: { page: 'list' } }),
    leftPane.activityLink({ name: 'board', icon: 'dashboard', label: 'KanbanActivity.LABEL' }),
    leftPane.activityLink({ name: 'colors', icon: 'las la-palette', label: 'ColorsActivity.LABEL', params: { mode: 'quasar' } }),
    leftPane.activityLink({ name: 'chart', icon: 'las la-chart-pie', label: 'ChartActivity.LABEL' }),
    leftPane.activityLink({ name: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL' }),
    leftPane.activityLink({ name: 'webpush', icon: 'las la-bell', label: 'WebPushActivity.LABEL' }),
    leftPane.activityLink({ name: 'tags', icon: 'las la-tags', label: 'TagsActivity.LABEL' }),
    helpers.horizontalSeparator(),
    leftPane.contextualHelp(),
    leftPane.about(),
    leftPane.logout('keycloak')
  ]
}

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

const collectionExport = {
  component: 'tool/KExportTool',
  service: 'documents',
  formats: [
    { label: 'CSV', value: 'csv' },
    { label: 'JSON', value: 'json' }
  ],
  transform: {
    csv: {
      mapping: {
        'icon.name': 'iconName',
        'icon.color': 'iconColor'
      },
      omit: ['_id', 'icon']
    },
    json: {
      omit: ['_id']
    }
  },
  gzip: false
}

const widgets = [
  {
    id: 'widget-1',
    label: 'Widget 1',
    icon: 'las la-restore-windows',
    content: { component: 'layout/Widget' },
    header: [{ id: 'title', component: 'KStamp', text: 'Widget 1', direction: 'horizontal' }]
  },
  {
    id: 'widget-2', label: 'Widget 2', content: { component: 'layout/Widget' }
  },
  {
    id: 'widget-3', label: 'Widget 3', content: { component: 'layout/Widget' }
  },
  {
    id: 'widget-4', label: 'Widget 4', content: { component: 'layout/Widget' }
  },
  {
    id: 'store-widget', label: 'Store', content: { component: 'KStore' }, scrollable: true
  }
]

module.exports = {
  pwaName,
  buildMode: process.env.BUILD_MODE === 'pwa' ? 'pwa' : 'spa',
  flavor: process.env.NODE_APP_INSTANCE || 'dev',
  version: require('../package.json').version,
  buildNumber: process.env.BUILD_NUMBER,
  apiPath: API_PREFIX,
  apiJwt: 'kapp-jwt',
  apiTimeout: 20000,
  transport: 'websocket', // Could be 'http' or 'websocket',
  appName: 'kApp',
  appLogo: 'kapp-logo.png',
  appChangelog: 'https://kalisio.github.io/kApp/about/changelog.html',
  publisher: 'Kalisio',
  publisherContact: 'support@kalisio.com',
  publisherWebsite: website,
  locale: {
    // If you'd like to force locale otherwise it is retrieved from browser
    // default: 'en',
    fallback: 'en'
  },
  logs: {
    level: (process.env.NODE_ENV === 'development' ? 'debug' : 'info')
  },
  storage: {
    useProxy: true
  },
  about: {
    actions: [
      {
        id: 'platform-info',
        icon: 'las la-desktop',
        label: 'KAbout.PLATFORM_INFO',
        stack: true,
        dialog: {
          title: 'KAbout.PLATFORM_INFO',
          component: 'app/KPlatform',
          okAction: 'CLOSE',
          widthPolicy: 'narrow'
        }
      },
      {
        id: 'report-bug',
        icon: 'las la-bug',
        label: 'KAbout.BUG_REPORT',
        stack: true,
        component: 'action/KBugReportAction'
      },
      {
        id: 'view-changelog',
        icon: 'las la-history',
        label: 'KAbout.VIEW_CHANGELOG',
        stack: true,
        url: 'https://kalisio.github.io/kApp/about/changelog.html'
      }
    ]
  },
  profile: {
    header: 'components/ProfileHeader'
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
        component: 'document/KDocument',
        url: 'kapp-terms.md'
      }
    }],
    login: {
      actions: [
        { id: 'reset-password-link', label: 'KLoginScreen.FORGOT_YOUR_PASSWORD_LABEL', route: { name: 'send-reset-password' } },
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
    }
  },
  layout: {
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
  account: {
    sections: [
      {
        title: 'KSubscriptionsManager.TITLE',
        component: 'account/KSubscriptionsManager',
        id: 'subscriptions-manager',
        actions: [
          { id: 'unsubscribe', tooltip: 'KSubscriptionCard.UNSUBSCRIBE_LABEL', icon: 'phonelink_erase', handler: 'unsubscribe' }
        ]
      }
    ],
    deletable: true
  },
  screenActivity: {
    panes: {
      left: LEFT_PANE
    }
  },
  layoutActivity: {
    header: {
      content: {
        'header-footer': [{ component: 'layout/Header' }]
      }
    },
    footer: {
      content: {
        'header-footer': [{ component: 'layout/Footer' }]
      }
    },
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          'header-footer': [
            { id: 'page', label: 'Header/Footer', color: 'primary', disabled: true },
            { id: 'panes', label: 'Panes', route: { name: 'layout-activity', params: { mode: 'panes' } } },
            { id: 'windows', label: 'Windows', route: { name: 'layout-activity', params: { mode: 'windows' } } },
            { id: 'fab', label: 'Fab', route: { name: 'layout-activity', params: { mode: 'fab' } } },
            { id: 'sticky', label: 'Stickies', route: { name: 'layout-activity', params: { mode: 'sticky' } } }
          ],
          panes: [
            { id: 'page', label: 'Header/Footer', route: { name: 'layout-activity', params: { mode: 'header-footer' } } },
            { id: 'panes', label: 'Panes', disabled: true },
            { id: 'windows', label: 'Windows', route: { name: 'layout-activity', params: { mode: 'windows' } } },
            { id: 'fab', label: 'Fab', route: { name: 'layout-activity', params: { mode: 'fab' } } },
            { id: 'sticky', label: 'Stickies', route: { name: 'layout-activity', params: { mode: 'sticky' } } }
          ],
          windows: [
            { id: 'page', label: 'Header/Footer', route: { name: 'layout-activity', params: { mode: 'header-footer' } } },
            { id: 'panes', label: 'Panes', route: { name: 'layout-activity', params: { mode: 'panes' } } },
            { id: 'windows', label: 'Windows', color: 'primary', disabled: true },
            { id: 'fab', label: 'Fab', route: { name: 'layout-activity', params: { mode: 'fab' } } },
            { id: 'sticky', label: 'Stickies', route: { name: 'layout-activity', params: { mode: 'sticky' } } }
          ],
          fab: [
            { id: 'page', label: 'Header/Footer', route: { name: 'layout-activity', params: { mode: 'header-footer' } } },
            { id: 'panes', label: 'Panes', route: { name: 'layout-activity', params: { mode: 'panes' } } },
            { id: 'windows', label: 'Windows', route: { name: 'layout-activity', params: { mode: 'windows' } } },
            { id: 'fab', label: 'Fab', color: 'primary', disabled: true },
            { id: 'sticky', label: 'Stickies', route: { name: 'layout-activity', params: { mode: 'sticky' } } }
          ],
          sticky: [
            { id: 'page', label: 'Header/Footer', route: { name: 'layout-activity', params: { mode: 'header-footer' } } },
            { id: 'panes', label: 'Panes', route: { name: 'layout-activity', params: { mode: 'panes' } } },
            { id: 'windows', label: 'Windows', route: { name: 'layout-activity', params: { mode: 'windows' } } },
            { id: 'fab', label: 'Fab', color: 'primary', route: { name: 'layout-activity', params: { mode: 'fab' } } },
            { id: 'sticky', label: 'Stickies', disabled: true }
          ]
        }
      },
      right: {
        content: [{ component: 'layout/RightPane' }],
        visible: false
      },
      bottom: {
        content: [{ component: 'layout/BottomPane' }],
        visible: false
      }
    },
    page: {
      content: {
        'header-footer': [{ component: 'layout/Layout', mode: 'page' }],
        panes: [{ component: 'layout/Layout', mode: 'panes' }],
        windows: [{ component: 'layout/Layout', mode: 'windows' }],
        fab: [{ component: 'layout/Layout', mode: 'fab' }],
        sticky: [{ component: 'layout/Layout', mode: 'sticky' }]
      }
    },
    fab: {
      content: {
        'header-footer': [
          { id: 'panes', label: 'Panes', icon: 'las la-window-minimize', route: { name: 'layout-activity', params: { mode: 'panes' } } },
          { id: 'windows', label: 'Windows', icon: 'las la-window-restore', route: { name: 'layout-activity', params: { mode: 'windows' } } },
          { id: 'fab', label: 'Fab', icon: 'las la-window-restore', route: { name: 'layout-activity', params: { mode: 'fab' } } }
        ],
        fab: [
          { id: 'header-footer', label: 'Header/Footer', icon: 'las la-stream', route: { name: 'layout-activity', params: { mode: 'header-footer' } } },
          { id: 'panes', label: 'Panes', icon: 'las la-window-minimize', route: { name: 'layout-activity', params: { mode: 'panes' } } },
          { id: 'windows', label: 'Windows', icon: 'las la-window-restore', route: { name: 'layout-activity', params: { mode: 'windows' } } }
        ]
      }
    },
    windows: {
      left: { content: [widgets[0], widgets[4]], current: 'widget-1' },
      right: { content: [widgets[1]], current: 'widget-2' },
      top: { content: [widgets[2]], current: 'widget-3' },
      bottom: { content: [widgets[3]], current: 'widget-4' }
    },
    stickies: {
      content: {
        sticky: [{ id: 'tl-ribbon', position: 'top-left', 'component.position': 'top-left', component: 'media/KRibbon', visible: false }, { id: 'tr-ribbon', position: 'top-right', 'component.position': 'top-right', component: 'media/KRibbon', visible: false }, { id: 'bl-ribbon', position: 'bottom-left', 'component.position': 'bottom-left', component: 'media/KRibbon', visible: false }, { id: 'br-ribbon', position: 'bottom-right', 'component.position': 'bottom-right', component: 'media/KRibbon', visible: false }]
      }
    }
  },
  componentsActivity: {
    padding: true,
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          text: [
            { id: 'text', label: 'Text', route: { name: 'components-activity', params: { mode: 'text' } } },
            { id: 'graphic', label: 'Graphic', route: { name: 'components-activity', params: { mode: 'graphic' } } },
            { id: 'time', label: 'Time', route: { name: 'components-activity', params: { mode: 'time' } } }
          ],
          graphic: [
            { id: 'text', label: 'Text', route: { name: 'components-activity', params: { mode: 'text' } } },
            { id: 'graphic', label: 'Graphic', route: { name: 'components-activity', params: { mode: 'graphic' } } },
            { id: 'time', label: 'Time', route: { name: 'components-activity', params: { mode: 'time' } } }
          ],
          time: [
            { id: 'text', label: 'Text', route: { name: 'components-activity', params: { mode: 'text' } } },
            { id: 'graphic', label: 'Graphic', route: { name: 'components-activity', params: { mode: 'graphic' } } },
            { id: 'time', label: 'Time', route: { name: 'components-activity', params: { mode: 'time' } } }
          ]
        }
      }
    },
    page: {
      content: {
        text: [{ component: 'components/TextMode', mode: 'text' }],
        graphic: [{ component: 'components/GraphicMode', mode: 'graphic' }],
        time: [{ component: 'components/TimeMode', mode: 'time' }]
      }
    }
  },
  documentActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          html: [
            { id: 'html', label: 'Html', color: 'primary', disabled: true },
            { id: 'md', label: 'Markdown', color: 'primary', route: { name: 'document-activity', params: { type: 'md' } } },
            { id: 'pdf', label: 'Pdf', color: 'primary', route: { name: 'document-activity', params: { type: 'pdf' } } },
            { id: 'png', label: 'Png', color: 'primary', route: { name: 'document-activity', params: { type: 'png' } } }
          ],
          md: [
            { id: 'html', label: 'Html', color: 'primary', route: { name: 'document-activity', params: { type: 'html' } } },
            { id: 'md', label: 'Markdown', color: 'primary', disabled: true },
            { id: 'pdf', label: 'Pdf', color: 'primary', route: { name: 'document-activity', params: { type: 'pdf' } } },
            { id: 'png', label: 'Png', color: 'primary', route: { name: 'document-activity', params: { type: 'png' } } }
          ],
          pdf: [
            { id: 'html', label: 'Html', color: 'primary', route: { name: 'document-activity', params: { type: 'html' } } },
            { id: 'md', label: 'Markdown', color: 'primary', route: { name: 'document-activity', params: { type: 'md' } } },
            { id: 'pdf', label: 'Pdf', color: 'primary', disabled: true },
            { id: 'png', label: 'Png', color: 'primary', route: { name: 'document-activity', params: { type: 'png' } } }
          ],
          png: [
            { id: 'html', label: 'Html', color: 'primary', route: { name: 'document-activity', params: { type: 'html' } } },
            { id: 'md', label: 'Markdown', color: 'primary', route: { name: 'document-activity', params: { type: 'md' } } },
            { id: 'pdf', label: 'Pdf', color: 'primary', route: { name: 'document-activity', params: { type: 'pdf' } } },
            { id: 'png', label: 'Png', color: 'primary', disabled: true }
          ]
        }
      }
    },
    page: {
      content: {
        html: [{ component: 'document/KDocument', url: 'sample.html', localize: true }],
        md: [{ component: 'document/KDocument', url: 'sample.md', localize: true }],
        pdf: [{ component: 'document/KDocument', url: 'sample.pdf', localize: true }],
        png: [{ component: 'document/KDocument', url: 'sample.png', localize: true }]
      }
    }
  },
  messagesActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: [
          { component: 'collection/KFilter', label: 'MessagesActivity.SEARCH', fields: ['body', 'author'], style: 'width: 50vw; min-width: 180px; max-width: 500px;' }
        ]
      },
      bottom: {
        content: [
          { component: 'messages/KMessageComposer', class: 'fit' }
        ],
        sizes: { xs: 100, sm: 600, md: 600, lg: 600, xl: 600 },
        visible: true,
        opener: false
      }
    },
    messages: {
      information: { label: 'KMessageComposer.message-type.INFORMATION', color: 'grey-7', textColor: 'black', icon: 'las la-info' },
      warning: { label: 'KMessageComposer.message-type.WARNING', color: 'warning', textColor: 'black', icon: 'las la-exclamation' },
      alert: { label: 'KMessageComposer.message-type.ALERT', color: 'negative', textColor: 'white', icon: 'las la-skull-crossbones' }
    }
  },
  collectionActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          list: [
            { id: 'list', icon: 'las la-list', label: 'CollectionActivity.LIST', color: 'primary', disabled: true },
            { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
            { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
            helpers.verticalSeparator(),
            { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
            { component: 'collection/KSorter' },
            collectionExport
          ],
          grid: [
            { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
            { id: 'grid', icon: 'view_module', label: 'CollectionActivity.GRID', color: 'primary', disabled: true },
            { id: 'table', icon: 'las la-table', tooltip: 'CollectionActivity.TABLE', route: { name: 'collection-activity', params: { page: 'table' } } },
            helpers.verticalSeparator(),
            { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
            { component: 'collection/KSorter' },
            collectionExport
          ],
          table: [
            { id: 'list', icon: 'las la-list', tooltip: 'CollectionActivity.LIST', route: { name: 'collection-activity', params: { page: 'list' } } },
            { id: 'grid', icon: 'view_module', tooltip: 'CollectionActivity.GRID', route: { name: 'collection-activity', params: { page: 'grid' } } },
            { id: 'table', icon: 'las la-table', label: 'CollectionActivity.TABLE', color: 'primary', disabled: true },
            helpers.verticalSeparator(),
            { id: 'filter', icon: 'las la-search', tooltip: 'CollectionActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } },
            { component: 'collection/KSorter' },
            collectionExport
          ],
          filter: [
            { id: 'back', icon: 'las la-arrow-left', handler: { name: 'restoreTopPaneMode' } },
            helpers.verticalSeparator('lightgrey'),
            { component: 'collection/KFilter', size: '1rem' }
          ]
        },
        mode: 'list'
      }
    },
    page: {
      content: {
        list: [{
          component: 'collection/KGrid',
          service: 'documents',
          renderer: {
            component: 'collection/KItem',
            actions: collectionActions,
            class: 'col-12'
          },
          appendItems: true,
          class: 'fit'
        }],
        grid: [{
          component: 'collection/KGrid',
          service: 'documents',
          renderer: {
            component: 'collection/KCard',
            sections: {
              description: {
                component: 'collection/KDescriptionCardSection'
              }
            },
            actions: collectionActions
          },
          class: 'fit'
        }],
        table: [{
          component: 'collection/KTable',
          service: 'documents',
          itemActions: collectionActions,
          nbItemsPerPage: 12,
          selection: 'multiple',
          class: 'fit'
        }]
      },
      mode: 'list'
    },
    fab: {
      content: [
        { id: 'create-document', icon: 'las la-plus', route: { name: 'create-document', params: { service: 'documents' } } }
      ]
    }
  },
  boardActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          default: [
            { id: 'table', icon: 'dashboard', label: 'KanbanActivity.LABEL', color: 'primary', disabled: true },
            { id: 'filter', icon: 'las la-search', tooltip: 'KanbanActivity.FILTER', handler: { name: 'setTopPaneMode', params: ['filter'] } }
          ],
          filter: [
            { id: 'back', icon: 'las la-arrow-left', handler: { name: 'setTopPaneMode', params: ['default'] } },
            helpers.verticalSeparator('lightgrey'),
            { component: 'collection/KFilter', size: '1rem' }
          ]
        },
        mode: 'default'
      }
    },
    categories: [
      { name: 'sain' },
      { name: 'malade' },
      { name: 'déclin' }
    ],
    categoryField: 'etat_sani'
  },
  colorsActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: {
          quasar: [
            { id: 'quasar-colors', label: 'ColorsActivity.QUASAR_COLORS', route: { name: 'colors-activity', params: { mode: 'quasar' } } },
            { id: 'html-colors', label: 'ColorsActivity.HTML_COLORS', route: { name: 'colors-activity', params: { mode: 'html' } } }
          ],
          html: [
            { id: 'quasar-colors', label: 'ColorsActivity.QUASAR_COLORS', route: { name: 'colors-activity', params: { mode: 'quasar' } } },
            { id: 'html-colors', label: 'ColorsActivity.HTML_COLORS', route: { name: 'colors-activity', params: { mode: 'html' } } }
          ]
        }
      }
    },
    page: {
      content: {
        quasar: [{ component: 'colors/QuasarColors', mode: 'quasar' }],
        html: [{ component: 'colors/HtmlColors', mode: 'html' }]
      }
    }
  },
  chartActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
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
    }
  },
  editorActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: [{ id: 'editor', icon: 'las la-edit', label: 'EditorActivity.LABEL', color: 'primary', disabled: true }]
      }
    },
    fab: {
      actions: [
        { id: 'editor', icon: 'las la-edit', label: 'EditorActivity.EDIT', route: { name: 'edit-object', params: { service: 'custom', objectId: '0' } } },
        { id: 'viewer', icon: 'las la-glasses', label: 'EditorActivity.VIEW', route: { name: 'view-object', params: { service: 'custom', objectId: '0' } } }
      ]
    }
  },
  webpushActivity: {
    panes: {
      left: LEFT_PANE
    }
  },
  tagsActivity: {
    panes: {
      left: LEFT_PANE,
      top: {
        content: [
          {
            component: 'collection/KFilter',
            label: 'TagsActivity.SEARCH',
            fields: ['name'],
            style: 'width: 50vw; min-width: 200px; max-width: 500px;'
          },
          {
            component: 'collection/KSorter',
            tooltip: 'TagsActivity.SORT'
          }
        ]
      }
    },
    items: {
      actions: [
        {
          id: 'edit-tag',
          icon: 'las la-edit',
          tooltip: 'TagsActivity.EDIT',
          dialog: {
            title: ':item.name',
            component: 'KEditor',
            service: 'tags',
            object: ':item',
            baseObject: {
              service: ':item.service',
              property: ':item.property'
            },
            hideButtons: true,
            schema: 'tags.update',
            cancelAction: 'CANCEL',
            okAction: {
              id: 'ok-button',
              label: 'APPLY',
              handler: 'apply'
            }
          }
        },
        {
          id: 'delete-tag',
          icon: 'las la-trash',
          label: 'TagsActivity.DELETE',
          handler: { name: 'removeItem', params: ['confirm'] }
        }
      ]
    },
    fab: {
      content: [
        {
          id: 'create-tag',
          icon: 'las la-plus',
          tooltip: 'TagsActivity.CREATE',
          dialog: {
            title: 'TagsActivity.CREATE',
            component: 'KEditor',
            service: 'tags',
            schema: 'tags.create',
            baseObject: { scope: 'user',
              service: 'documents',
              property: 'tags'
             },
            okAction: {
              id: 'apply-button',
              label: 'APPLY',
              handler: 'apply'
            },
            cancelAction: 'CANCEL'
          }
        }
      ]
    }
  },
  routes: require('../src/router/routes')
}
