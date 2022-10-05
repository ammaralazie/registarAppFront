import ar from 'vuetify/lib/locale/ar'

export default {
  head: {
    titleTemplate: '%s - برنامج التسجيل',
    title: 'برنامج التسجيل',
    htmlAttrs: {
      lang: 'ar'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'line-awesome/dist/line-awesome/css/line-awesome.css'
  ],

  plugins: [],

  router: {
    middleware: ['auth']
  },

  // server: {
  //   port: 2000,
  //   host: '0'
  // },

  ssr: false,

  components: true,

  loading: '~/components/loading.vue',

  target: 'static',

  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/auth-next',
  ],

  // pwa: {
  //   manifest: {
  //     name: 'كلية دجلة - برنامج التسجيل',
  //     lang: 'ar',
  //     short_name: 'برنامج التسجيل',
  //     description: 'برنامج تسجيل و ادارة الطلاب و الاوامر الادارية',
  //     useWebmanifestExtension: false
  //   },
  //   icon: {
  //     purpose: 'any'
  //   }
  // },



  axios: {
    // local dijlah server
    baseURL: 'http://10.0.3.55:3100/api/',

    // online dijlah server
    //baseURL: 'http://109.224.62.102:3100/api/',

    // mustafa local server
    // baseURL: 'http://10.0.0.161:3100/api/',

    // mustafa online server
    // baseURL: 'http://161.22.43.108:3600/api/',

    //my localhost 
   // baseURL: 'http://localhost:3100/api/',
  },

  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer',
          prefix: '_token.',
        },
        user: {},
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: false,
          user: false
        }
      }
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icon: {
        iconfont: 'mdi'
      },
    },
    treeShake: true,
    rtl: true,
    lang: {
      locales: { ar },
      current: 'ar',
    },

    theme: {
      dark: false,
      themes: {
       dark : {
          primary: "#17223B",
          secondary: "#263859",
          info: "#20A4F3",
          warning: "#FF9B42",
          error: "#FF3366",
          success: "#2EC4B6",
          accent: "#F6F7F8",
        },

        light: {
          primary: "#F1F3F8",
          secondary: "#F1F3F8",
          info: "#20A4F3",
          warning: "#FF9B42",
          error: "#FF3366",
          success: "#2EC4B6",
          accent: "#000",
        }
      }
    }
  },

  build: {
  }
}
