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
    "revision": "101fe1490b73345502523e9a6c7d668d"
  },
  {
    "url": "about/contact.html",
    "revision": "2660e6cec5d2d9c2752074bd060daa34"
  },
  {
    "url": "about/contributing.html",
    "revision": "1bffbd18fe15e002d16822f7f3cf3cd6"
  },
  {
    "url": "about/index.html",
    "revision": "7b95ae9c0e60c02920ba82b4b49a2561"
  },
  {
    "url": "about/license.html",
    "revision": "19bfde81ae035f99e32b0533f5a6c2f6"
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
    "url": "assets/js/21.2c1e4cf4.js",
    "revision": "f625c01eb019e0265f88644eae80cbce"
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
    "url": "assets/js/9.7b7572ba.js",
    "revision": "4ecc5b9fcfad5f633d6532b60b2d0843"
  },
  {
    "url": "assets/js/app.1bee3b76.js",
    "revision": "94364eb9b1ddc16f4ce76cf8bdf5f4cd"
  },
  {
    "url": "guides/customizing/tour.html",
    "revision": "90113ad01f3ffdffa800704b5edd3491"
  },
  {
    "url": "guides/development/configure.html",
    "revision": "b28003cadb326c374c92785bd6dabed1"
  },
  {
    "url": "guides/development/deploy.html",
    "revision": "7ebd8b6611b9c28d06a5d51874e554f4"
  },
  {
    "url": "guides/development/develop.html",
    "revision": "0f30dcfa1e34b9a0b62688dc349c12b4"
  },
  {
    "url": "guides/development/publish.html",
    "revision": "d84473d9938e54bed0fad9e12314584e"
  },
  {
    "url": "guides/development/setup.html",
    "revision": "896ada1f8e9b73f7a6c3ad9eb140184e"
  },
  {
    "url": "guides/development/test.html",
    "revision": "f4ebb7d86183310d0dbe41af690cec36"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "de96ce11203eb0eb43b3342ec1609ff8"
  },
  {
    "url": "guides/introduction.html",
    "revision": "86d0492b698183dce05b391ef914c781"
  },
  {
    "url": "index.html",
    "revision": "5f9bca4b48dd852e6b13dd9e06e57887"
  },
  {
    "url": "reference/configuration.html",
    "revision": "c4cd4c71423d540560d9a1e355d2f368"
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
