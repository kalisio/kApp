import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../utils'
import config from 'config'

Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    // scrollBehavior: () => ({ y: 0 }),
    routes: utils.buildRoutes(config.routes),

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
