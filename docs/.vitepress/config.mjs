import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/kApp',
  title: 'kApp',
  description: 'kApp - KDK demonstration application',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kapp/kapp-icon-color-2048x2048.png' }]
  ],
  themeConfig: {
    logo: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kapp/kapp-icon-color-2048x2048.png',
    nav: [
      { text: 'About', link: '/about/introduction' }
    ],
    sidebar: {
      '/about/': getAboutSidebar()
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kalisio/kApp' }
    ],
    footer: {
      copyright: 'MIT Licensed | Copyright © 2017-20xx Kalisio'
    },
  },
  vite: {
    optimizeDeps: {
			include: ['keycloak-js', 'lodash'],
		},
		ssr: {
			noExternal: ['vitepress-theme-kalisio']
		}
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
