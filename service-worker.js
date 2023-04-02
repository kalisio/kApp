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
    "revision": "5e97566bff78d1df8c0b2dd52372a0c8"
  },
  {
    "url": "about/contact.html",
    "revision": "6cbf344bdadaf9e39f20e760e3660a1e"
  },
  {
    "url": "about/contributing.html",
    "revision": "29b43fddd2e7d33857bb28c0a7ade45c"
  },
  {
    "url": "about/index.html",
    "revision": "132cf5bc80a0a7f8f129c4abcb39e1ae"
  },
  {
    "url": "about/license.html",
    "revision": "f06d84f2bd2bd5b4dea93dde93dbc081"
  },
  {
    "url": "assets/css/0.styles.1fa0446e.css",
    "revision": "b20841317d52c9dfc1b0b2e1f612a78e"
  },
  {
    "url": "assets/img/cd-pipeline-android.aac6a2e0.svg",
    "revision": "aac6a2e0ae4e0a08d62434fc4f9e700c"
  },
  {
    "url": "assets/img/cd-pipeline-app.f5ae4922.svg",
    "revision": "f5ae4922e9e2a5263b805ee8a1cd1779"
  },
  {
    "url": "assets/img/cd-pipeline-env.e2075fb1.svg",
    "revision": "e2075fb1bb069e7f46ea7f0a880df06b"
  },
  {
    "url": "assets/img/cd-pipeline-global.bf86d245.svg",
    "revision": "bf86d245695e16937bf9f6e08c38b0ad"
  },
  {
    "url": "assets/img/cd-pipeline-ios.b4f66a54.svg",
    "revision": "b4f66a5494f77e98899d44a066515ed0"
  },
  {
    "url": "assets/img/cd-pipeline-travis.5e40ee62.svg",
    "revision": "5e40ee62f8c213080bcd46106366ccbd"
  },
  {
    "url": "assets/img/kapp.30fbbf83.png",
    "revision": "30fbbf830c63db61d44781d438532d45"
  },
  {
    "url": "assets/img/kdk-workspace.d228efd0.png",
    "revision": "d228efd0427f5ee0027e9557bf11f9c8"
  },
  {
    "url": "assets/img/LaunchTour-EN.3d96b211.png",
    "revision": "3d96b21138cfcfd345278014eb6d545e"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/Tour-EN.a368be77.png",
    "revision": "a368be7752ea12ad2c014456f4811532"
  },
  {
    "url": "assets/js/10.e469cfaa.js",
    "revision": "b815cb8266ddb4aacd51dfe31f39983b"
  },
  {
    "url": "assets/js/11.574ac872.js",
    "revision": "5a093b737788b4f52426e24c806437e9"
  },
  {
    "url": "assets/js/12.28ba3fb1.js",
    "revision": "3409935cebb744fe054d42eca979460e"
  },
  {
    "url": "assets/js/13.9e4b8dd2.js",
    "revision": "f14ddc1bbcc287518615bfedd507ace2"
  },
  {
    "url": "assets/js/14.46081452.js",
    "revision": "3684d9a579bf45165e6423f5588e068a"
  },
  {
    "url": "assets/js/15.0b5508a8.js",
    "revision": "336c89086f445510e9228a5351bd41a0"
  },
  {
    "url": "assets/js/16.0791dd24.js",
    "revision": "abf65c28e4c960e377c3646202055a23"
  },
  {
    "url": "assets/js/17.97c6620a.js",
    "revision": "2baf5608fee29fff1477c4b4d7e4283a"
  },
  {
    "url": "assets/js/18.9efd8083.js",
    "revision": "1b660b1c84ead3cb793fc7d04052265d"
  },
  {
    "url": "assets/js/19.938c5482.js",
    "revision": "83dd1194bae063f2bc983ab04c5c6581"
  },
  {
    "url": "assets/js/2.cbdd6b15.js",
    "revision": "41767abba1a808e7fd9b3975ae0c954e"
  },
  {
    "url": "assets/js/20.db67d306.js",
    "revision": "4d7d85931872aa536675bd591f32e093"
  },
  {
    "url": "assets/js/21.05ccc6fc.js",
    "revision": "aed180e6119a211b8846f7d7dcc272f1"
  },
  {
    "url": "assets/js/22.025ce304.js",
    "revision": "d93353ddda330d362901317a416d0291"
  },
  {
    "url": "assets/js/23.ca4152cb.js",
    "revision": "592f8ae70970d66fb8397681621cd1b0"
  },
  {
    "url": "assets/js/24.027fa423.js",
    "revision": "56fbb714e0515b463cdb7c636edcb1fc"
  },
  {
    "url": "assets/js/25.41f858f9.js",
    "revision": "dafb97ad3dbede268d00725631d07c4e"
  },
  {
    "url": "assets/js/26.b54298d5.js",
    "revision": "13e861588dc7eb669b88d66b9afc5d58"
  },
  {
    "url": "assets/js/27.8910133c.js",
    "revision": "56c25ae7cccdbb9b3f1144814e724bd6"
  },
  {
    "url": "assets/js/28.4f253e94.js",
    "revision": "d45f4eea14b9d4b3e4e283b8417ebdc4"
  },
  {
    "url": "assets/js/3.570126cc.js",
    "revision": "faf9a8baa563c6e74bc4576eeee8439e"
  },
  {
    "url": "assets/js/4.f34cb6fc.js",
    "revision": "f51538ede703eb74b82861380793086d"
  },
  {
    "url": "assets/js/5.74cb447b.js",
    "revision": "c596a75a9900c8e715b532b8883a43c8"
  },
  {
    "url": "assets/js/6.97220d0f.js",
    "revision": "e0bb173dad1b376bcd425205a4f4efc3"
  },
  {
    "url": "assets/js/7.c1248ca3.js",
    "revision": "a08ea15919470879de4ae64713a6bcbd"
  },
  {
    "url": "assets/js/8.98ec870f.js",
    "revision": "2084951273678c6141ac49778139306f"
  },
  {
    "url": "assets/js/9.52b3f426.js",
    "revision": "3caffeedb53da5ffef2818d5850c5fae"
  },
  {
    "url": "assets/js/app.3aeab27d.js",
    "revision": "ebf41c9348d27690438bbd1ce6a8c669"
  },
  {
    "url": "guides/customizing/tour.html",
    "revision": "71e95e9eb2db99057adb7b0e9eb4064e"
  },
  {
    "url": "guides/development/configure.html",
    "revision": "132da0a2e56d8f7a064dc5c22b00f5d3"
  },
  {
    "url": "guides/development/deploy.html",
    "revision": "5ebf059a85d71bef96f53056797e52cd"
  },
  {
    "url": "guides/development/develop.html",
    "revision": "3fcab0db7913852556a4b83b5d99529d"
  },
  {
    "url": "guides/development/publish.html",
    "revision": "492153142dc53334f7ae11467b519394"
  },
  {
    "url": "guides/development/setup.html",
    "revision": "a577eba3d2e703cc34fc55dd6154c869"
  },
  {
    "url": "guides/development/test.html",
    "revision": "f174e34882b6783190d023b84cf6352b"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "859d813ba9544bf48d34619d4681c4e5"
  },
  {
    "url": "guides/introduction.html",
    "revision": "5e2a6d79bfec3817849331675cf4c7ef"
  },
  {
    "url": "index.html",
    "revision": "f87214220a709d9342c3d9f8bb2353ed"
  },
  {
    "url": "reference/configuration.html",
    "revision": "f80f0f970ece88ea659d2026a6101dde"
  },
  {
    "url": "side-nav-tour.js",
    "revision": "9da02b79b6dd93b03897195510212399"
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
