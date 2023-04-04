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
    "revision": "9a5b5c963494e2c0df4bdbd76e8ed986"
  },
  {
    "url": "about/contact.html",
    "revision": "3087c9d2624c2bdc8e6ba6f79d050a85"
  },
  {
    "url": "about/contributing.html",
    "revision": "c02d9763124d2697262b49e6ff752108"
  },
  {
    "url": "about/index.html",
    "revision": "3633da62ceb10d607f3536bc4b0eb9f8"
  },
  {
    "url": "about/license.html",
    "revision": "27770c5d97a1561e1ba67d652142f3bb"
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
    "url": "assets/js/10.dfa57fc0.js",
    "revision": "7162fe41b487db58103623bb54fe17f5"
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
    "url": "assets/js/20.4ecad343.js",
    "revision": "8fb52d7ea925a9f105fa92b1127b5f9d"
  },
  {
    "url": "assets/js/21.05ccc6fc.js",
    "revision": "aed180e6119a211b8846f7d7dcc272f1"
  },
  {
    "url": "assets/js/22.0861876d.js",
    "revision": "9ea198060cfaf89ec1909c8e9cd145b6"
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
    "url": "assets/js/app.d1a46770.js",
    "revision": "2d2934d03b2ebcf3789250566623407d"
  },
  {
    "url": "guides/customizing/tour.html",
    "revision": "7572a87bc58a9a39c1b313f4df9dc9b9"
  },
  {
    "url": "guides/development/configure.html",
    "revision": "08e4eecec4e33817e1b71642560e55c3"
  },
  {
    "url": "guides/development/deploy.html",
    "revision": "5906cdfd96786eaa2aa7b3cbc1f3acbf"
  },
  {
    "url": "guides/development/develop.html",
    "revision": "5bbe715764c5e6f6f8d1fcf9587ea10c"
  },
  {
    "url": "guides/development/publish.html",
    "revision": "406d7e61cca611b6154872abf30ba6cd"
  },
  {
    "url": "guides/development/setup.html",
    "revision": "e07c4fc33e7b22c3013ff50f8a330922"
  },
  {
    "url": "guides/development/test.html",
    "revision": "7153a9d299b74dd404fafaf0ef5fb7ff"
  },
  {
    "url": "guides/installing-kapp.html",
    "revision": "94667807aa841db3a1f9dc518efcd966"
  },
  {
    "url": "guides/introduction.html",
    "revision": "c1b0e89da9a2a1e8b3aa43796d94260f"
  },
  {
    "url": "index.html",
    "revision": "848f298d623eb81a5ee7867cbcb5d660"
  },
  {
    "url": "reference/configuration.html",
    "revision": "a01dd4482a80455c0ee0fc166ec37230"
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
