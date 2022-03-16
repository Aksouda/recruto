import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '..\\layouts\\error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_3e2872af from 'nuxt_plugin_plugin_3e2872af' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_plugin_52f8dfa5 from 'nuxt_plugin_plugin_52f8dfa5' // Source: .\\vuetify\\plugin.js (mode: 'all')
import nuxt_plugin_vueamplitudeplugin_287872a2 from 'nuxt_plugin_vueamplitudeplugin_287872a2' // Source: .\\vue-amplitude-plugin.js (mode: 'client')
import nuxt_plugin_pluginseo_7a8c61b0 from 'nuxt_plugin_pluginseo_7a8c61b0' // Source: .\\nuxt-i18n\\plugin.seo.js (mode: 'all')
import nuxt_plugin_pluginrouting_6ff66da7 from 'nuxt_plugin_pluginrouting_6ff66da7' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_dae291b0 from 'nuxt_plugin_pluginmain_dae291b0' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_workbox_20c39dee from 'nuxt_plugin_workbox_20c39dee' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_0a60c46e from 'nuxt_plugin_metaplugin_0a60c46e' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_0f0869e2 from 'nuxt_plugin_iconplugin_0f0869e2' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_webfontloader_40130952 from 'nuxt_plugin_webfontloader_40130952' // Source: .\\webfontloader.js (mode: 'client')
import nuxt_plugin_axios_2ceb3552 from 'nuxt_plugin_axios_2ceb3552' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_pluginclient_7cba3836 from 'nuxt_plugin_pluginclient_7cba3836' // Source: .\\content\\plugin.client.js (mode: 'client')
import nuxt_plugin_pluginserver_275c556d from 'nuxt_plugin_pluginserver_275c556d' // Source: .\\content\\plugin.server.js (mode: 'server')
import nuxt_plugin_googleanalytics_97c008d8 from 'nuxt_plugin_googleanalytics_97c008d8' // Source: .\\google-analytics.js (mode: 'client')
import nuxt_plugin_confetti_5efd2404 from 'nuxt_plugin_confetti_5efd2404' // Source: ..\\plugins\\confetti (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    return this.$root.$options.$nuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"titleTemplate":"%s - Big Five","title":"Recruitment Platform","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Take a free, open-source Big Five personality test. Learn to know your personality traits and compare yourself with your partner, colleagues, friends or family."},{"hid":"keywords","name":"keywords","content":"big five personality test, big 5 personality test, b5 test, bigfive test, personality traits, bigfive, compare, free, jordan peterson"},{"hid":"og:title","name":"og:title","content":"Free open-source BigFive personality traits test"},{"hid":"og:description","name":"og:description","content":"Take a free, open-source Big Five personality test. Learn to know your personality traits and compare yourself with your partner, colleagues, friends or family"},{"hid":"og:type","name":"og:type","content":"website"},{"hid":"og:url","name":"og:url","content":"https:\u002F\u002Fbigfive-test.com"},{"hid":"og:image","name":"og:image","content":"https:\u002F\u002Fbigfive-test.com\u002Ficon.png"},{"hid":"twitter:card","name":"twitter:card","content":"summary"},{"hid":"twitter:site","name":"twitter:site","content":"@maccyber"},{"hid":"twitter:title","name":"twitter:title","content":"Free open-source BigFive personality traits test"},{"hid":"twitter:description","name":"twitter:description","content":"Take a free, open-source Big Five personality test. Learn to know your personality traits and compare yourself with your partner, colleagues, friends or family"},{"hid":"twitter:image","name":"twitter:image","content":"https:\u002F\u002Fbigfive-test.com\u002Ficon.png"},{"hid":"twitter:image:alt","name":"twitter:image:alt","content":"BigFive logo"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"}],"style":[],"script":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_3e2872af === 'function') {
    await nuxt_plugin_plugin_3e2872af(app.context, inject)
  }

  if (typeof nuxt_plugin_plugin_52f8dfa5 === 'function') {
    await nuxt_plugin_plugin_52f8dfa5(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueamplitudeplugin_287872a2 === 'function') {
    await nuxt_plugin_vueamplitudeplugin_287872a2(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginseo_7a8c61b0 === 'function') {
    await nuxt_plugin_pluginseo_7a8c61b0(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_6ff66da7 === 'function') {
    await nuxt_plugin_pluginrouting_6ff66da7(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_dae291b0 === 'function') {
    await nuxt_plugin_pluginmain_dae291b0(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_20c39dee === 'function') {
    await nuxt_plugin_workbox_20c39dee(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_0a60c46e === 'function') {
    await nuxt_plugin_metaplugin_0a60c46e(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_0f0869e2 === 'function') {
    await nuxt_plugin_iconplugin_0f0869e2(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_webfontloader_40130952 === 'function') {
    await nuxt_plugin_webfontloader_40130952(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_2ceb3552 === 'function') {
    await nuxt_plugin_axios_2ceb3552(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_pluginclient_7cba3836 === 'function') {
    await nuxt_plugin_pluginclient_7cba3836(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_pluginserver_275c556d === 'function') {
    await nuxt_plugin_pluginserver_275c556d(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googleanalytics_97c008d8 === 'function') {
    await nuxt_plugin_googleanalytics_97c008d8(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_confetti_5efd2404 === 'function') {
    await nuxt_plugin_confetti_5efd2404(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, (err) => {
        // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
        if (!err._isRouter) return reject(err)
        if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
