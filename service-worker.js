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
    "revision": "aad7dc906dd34c218a93294c07242050"
  },
  {
    "url": "about/contact.html",
    "revision": "bceb502bdc4651908e56bc27618b2574"
  },
  {
    "url": "about/contributing.html",
    "revision": "06ea5497576e5ed4f31e68154fb052d2"
  },
  {
    "url": "about/index.html",
    "revision": "f7a173848c3d0c5d3e7e926fcda23bb7"
  },
  {
    "url": "about/license.html",
    "revision": "501ed9e1e72c29adf98e28dbc58573fd"
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
    "url": "assets/img/kApp.30fbbf83.png",
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
    "url": "assets/js/10.e8b251f8.js",
    "revision": "e39fa87aaf7d5d539b5f6af703b27fa9"
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
    "url": "assets/js/18.1ae591b5.js",
    "revision": "5d3c616a26158611cb34cf85dda362fb"
  },
  {
    "url": "assets/js/19.e493b7a4.js",
    "revision": "df7b1d57123095fbe13c3648e2abfec0"
  },
  {
    "url": "assets/js/2.cbdd6b15.js",
    "revision": "41767abba1a808e7fd9b3975ae0c954e"
  },
  {
    "url": "assets/js/20.734ac1dc.js",
    "revision": "fbbfbbe090457284583276bc2b7991d3"
  },
  {
    "url": "assets/js/21.8726ab21.js",
    "revision": "69e71682096d89d8ff40ef008ca94e3b"
  },
  {
    "url": "assets/js/22.a94bba2e.js",
    "revision": "0b2299883c15c45e7a14efe74785c0e6"
  },
  {
    "url": "assets/js/23.9edf7edb.js",
    "revision": "8391be28e3ab6999cf47984daa0be2ba"
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
    "url": "assets/js/4.02093604.js",
    "revision": "c54a0bafb504631e37b4750942670963"
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
    "url": "assets/js/9.d34b5db8.js",
    "revision": "e35615bf026f6c9f420cd0b122fc4fa8"
  },
  {
    "url": "assets/js/app.93ef34c7.js",
    "revision": "22e29b022e1b5ac32a204a233fa5b72d"
  },
  {
    "url": "guides/customizing/tour.html",
    "revision": "c8d0beff771decaaa6b2d5669cbe7b65"
  },
  {
    "url": "guides/development/configure.html",
    "revision": "0b279a2ee2404dd7894175f082d624ea"
  },
  {
    "url": "guides/development/deploy.html",
    "revision": "aaff02cb6cf0736c66c20d476d42333f"
  },
  {
    "url": "guides/development/develop.html",
    "revision": "aa411457436534841c1f57a4344d46f7"
  },
  {
    "url": "guides/development/publish.html",
    "revision": "79eb7cb356b2455b4fd3b2c1fc0688c6"
  },
  {
    "url": "guides/development/setup.html",
    "revision": "3f2514f27acd841a126951c034eaa6d3"
  },
  {
    "url": "guides/development/test.html",
    "revision": "fb18c32091ab7fbf2c7c666474b9d482"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "02c937cc77ee3d4c32e64477efe11bba"
  },
  {
    "url": "guides/introduction.html",
    "revision": "99842287500edaef5a3d7b1b7ef042a6"
  },
  {
    "url": "index.html",
    "revision": "0cdc1ba080b2a3faf87a4df72662804b"
  },
  {
    "url": "reference/configuration.html",
    "revision": "c39ce187b4feef1a88a5eb940a63a260"
  },
  {
    "url": "router-tour.js",
    "revision": "030de145571165badb8449ea39ac79b4"
  },
  {
    "url": "router-tours.js",
    "revision": "8f39bc2515e2927c7e22e9fbc838b5c0"
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
