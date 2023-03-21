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
    "revision": "8b98d4958504670334da99e6e66dff57"
  },
  {
    "url": "about/contact.html",
    "revision": "508cf8880a7beab0419fcadfc8ed08ad"
  },
  {
    "url": "about/contributing.html",
    "revision": "e00d34de18a89f821a6169fafe035b3f"
  },
  {
    "url": "about/index.html",
    "revision": "7ad691bd34ec83a9ffd263d605929912"
  },
  {
    "url": "about/license.html",
    "revision": "9a850c6043d4b3b7a91c614690552169"
  },
  {
    "url": "assets/css/0.styles.ff626e3f.css",
    "revision": "abd77c16d31af7f2d6272080a8ebe8da"
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
    "url": "assets/js/app.ed43754d.js",
    "revision": "769a5a92a78257f1e3031308e12e3d07"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "a25b155d9d2bdc77e5faa05f742d7414"
  },
  {
    "url": "guides/introduction.html",
    "revision": "2235106df04b178c7bac29d9ae53d138"
  },
  {
    "url": "index.html",
    "revision": "ba5b8d9ce88f82bbb306ac0bca1626c3"
  },
  {
    "url": "reference/configuration.html",
    "revision": "dd3b04282c4c38d1e5ee7bbd07ed07c2"
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
