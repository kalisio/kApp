import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/kApp/',
  title: 'kApp',
  description: 'kApp - KDK application template',
  ignoreDeadLinks: true,
  themeConfig: {
    logo: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kapp/kapp-icon-64x64.png',
    nav: [
      { text: 'About', link: '/about/introduction' },
      { text: 'Guides', link: '/guides/introduction' },
      { text: 'Reference', link: '/reference/configuration' }
    ],
    sidebar: {
      '/about/': getAboutSidebar(),
      '/guides/': getGuidesSidebar(),
      '/reference/': getReferenceSidebar()
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kalisio/kApp' }
    ],
    footer: {
      copyright: 'MIT Licensed | Copyright © 2017-20xx Kalisio'
    },


  }
})

function getAboutSidebar () {
  return [
    { text: 'About', link: '/about/introduction' },
    { text: 'Contributing', link: '/about/contributing' },
    { text: 'License', link: '/about/license' },
    { text: 'Contact', link: '/about/contact' }
  ] 
}

function getGuidesSidebar () {
  return [
    { text: 'Introduction', link: '/guides/introduction' },
    { text: 'Installing kApp', link: '/guides/installing-kapp' },
    { text: 'Customizing kApp', 
      collapsed: true,
      items: [
        { text: 'Tour', link: '/guides/customizing/tour' }
      ]
    },
    {
      text: 'Development',
      collapsed: true,
      items: [
        { text: 'Setup your environment', link: '/guides/development/setup' },
        { text: 'Develop your app', link: '/guides/development/develop' },
        { text: 'Testing your app', link: '/guides/development/test' },
        { text: 'Configure your app', link: '/guides/development/configure' },
        { text: 'Deploy your app', link: '/guides/development/deploy' },
        { text: 'Publish your app', link: '/guides/development/publish' }
      ]
    }
  ]
}

function getReferenceSidebar () {
  return [
    { text: 'Configuring a kApp', link: '/reference/configuration' }
  ]
}