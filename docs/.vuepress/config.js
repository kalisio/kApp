module.exports = {
  base: '/kApp/',
  port: 8888,
  title: 'kApp',
  description: 'KApp - KDK application template',
  head: [
    ['link', { rel: 'icon', href: `https://s3.eu-central-1.amazonaws.com/kalisioscope/kapp/kapp-icon-64x64.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }]
  ],
  theme: 'kalisio',
  themeConfig: {
    nav: [
      { text: 'About', link: '/about/' },
      { text: 'Guides', link: '/guides/introduction' },
      { text: 'Reference', link: '/reference/configuration' },
      { text: 'GitHub', link: 'https://github.com/kalisio/kApp' }
    ],
    sidebar: {
      '/about/': getAboutSidebar(),
      '/guides/': getGuidesSidebar(),
      '/reference/': getReferenceSidebar()
    }
  }
}

function getAboutSidebar () {
  return [
    '',
    'contributing',
    'license',
    'contact'
  ] 
}

function getGuidesSidebar () {
  return [
    'introduction',
    'installing-kapp'
  ]
}

function getReferenceSidebar () {
  return [
    'configuration'
  ]
}
