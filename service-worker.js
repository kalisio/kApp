/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "458c2de7490c048da7dae05c5370ecf2"
  },
  {
    "url": "about/contact.html",
    "revision": "146dd4fa8ee92b4b60bda1b25cab9fb5"
  },
  {
    "url": "about/contributing.html",
    "revision": "beef13a8dbe2ff139d9e46d9cbd4f2ba"
  },
  {
    "url": "about/index.html",
    "revision": "b8d2d1a39410a65750f13de57133a519"
  },
  {
    "url": "about/license.html",
    "revision": "42e5afc8da76c1c6f9f3792d3679d5ae"
  },
  {
    "url": "assets/css/0.styles.1fa0446e.css",
    "revision": "b20841317d52c9dfc1b0b2e1f612a78e"
  },
  {
    "url": "assets/img/kapp.30fbbf83.png",
    "revision": "30fbbf830c63db61d44781d438532d45"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.61aa7442.js",
    "revision": "6172b0e50e8286378671a825061b869e"
  },
  {
    "url": "assets/js/11.99b320a9.js",
    "revision": "a5efe28ab480df61ee280af219fa88c9"
  },
  {
    "url": "assets/js/12.e301aa07.js",
    "revision": "70524349eb63becb046839997a457433"
  },
  {
    "url": "assets/js/13.1f668466.js",
    "revision": "d700f6b99bcc75bde4d91bf11e662c0f"
  },
  {
    "url": "assets/js/14.fe3b02af.js",
    "revision": "d77f1d221fdda3c51c860e8bacbda060"
  },
  {
    "url": "assets/js/15.c24307a0.js",
    "revision": "8e5ea7ecb27c77c858fa352c2a8d619e"
  },
  {
    "url": "assets/js/16.e3d76bce.js",
    "revision": "a2165fdd565a676d8f41bf387421ef3a"
  },
  {
    "url": "assets/js/17.fa556ef2.js",
    "revision": "61b0c09fe48f244b73975ee98cd7b9a5"
  },
  {
    "url": "assets/js/18.bf0161cb.js",
    "revision": "f809592369863ead77549f1677d4ce50"
  },
  {
    "url": "assets/js/19.3f7678dc.js",
    "revision": "db271766220b1dd67d75310e9c13ace0"
  },
  {
    "url": "assets/js/2.91ffa69f.js",
    "revision": "e87549b0d371334dcef25b405686c31c"
  },
  {
    "url": "assets/js/20.ea4e1625.js",
    "revision": "f99046e02d0ca209da8989c1469be009"
  },
  {
    "url": "assets/js/21.ce8d0cc4.js",
    "revision": "09e55e74e14b3bfbe7f12219d56d081e"
  },
  {
    "url": "assets/js/3.6138c73d.js",
    "revision": "c10d786742f38802cc41effa25db3b67"
  },
  {
    "url": "assets/js/4.13e27511.js",
    "revision": "7118c05f5b6d9de17f8a0be9a1612b6f"
  },
  {
    "url": "assets/js/5.cfb4d0a6.js",
    "revision": "d3021162c5525dda549f14cc1fb4d616"
  },
  {
    "url": "assets/js/6.b510ac4b.js",
    "revision": "7b48b5cb4f04f0fa2fa8b8ced8832acf"
  },
  {
    "url": "assets/js/7.9e37dea4.js",
    "revision": "40df4c6713143f65728b499d5ecac3b0"
  },
  {
    "url": "assets/js/8.3571fc36.js",
    "revision": "23f04221d7a6c0db092fd07c66f9a2b9"
  },
  {
    "url": "assets/js/9.ca531688.js",
    "revision": "87d6de00bc3fef740f43380b077e1d76"
  },
  {
    "url": "assets/js/app.d53940b5.js",
    "revision": "6982273c1da584a49b5eef0781260e4a"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "959ecd39f49819563e148bef4962522d"
  },
  {
    "url": "guides/introduction.html",
    "revision": "58537f273b11b88dd1d2645ba977dea9"
  },
  {
    "url": "index.html",
    "revision": "a2cc7d255fe1597cbd4942556a47e3cd"
  },
  {
    "url": "reference/configuration.html",
    "revision": "41916580f56596aaf4720b93ceebd665"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
