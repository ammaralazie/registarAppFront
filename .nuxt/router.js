import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b2e6ef48 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _231b0ac0 = () => interopDefault(import('..\\pages\\orders\\index.vue' /* webpackChunkName: "pages/orders/index" */))
const _cad08960 = () => interopDefault(import('..\\pages\\reports\\index.vue' /* webpackChunkName: "pages/reports/index" */))
const _211f7f6d = () => interopDefault(import('..\\pages\\students\\index.vue' /* webpackChunkName: "pages/students/index" */))
const _35ef44a7 = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _47bcdc86 = () => interopDefault(import('..\\pages\\students\\add\\index.vue' /* webpackChunkName: "pages/students/add/index" */))
const _2162ec34 = () => interopDefault(import('..\\pages\\students\\profile\\_id.vue' /* webpackChunkName: "pages/students/profile/_id" */))
const _46363576 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _b2e6ef48,
    name: "login"
  }, {
    path: "/orders",
    component: _231b0ac0,
    name: "orders"
  }, {
    path: "/reports",
    component: _cad08960,
    name: "reports"
  }, {
    path: "/students",
    component: _211f7f6d,
    name: "students"
  }, {
    path: "/users",
    component: _35ef44a7,
    name: "users"
  }, {
    path: "/students/add",
    component: _47bcdc86,
    name: "students-add"
  }, {
    path: "/students/profile/:id?",
    component: _2162ec34,
    name: "students-profile-id"
  }, {
    path: "/",
    component: _46363576,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
