const { resolve } = require('path')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
console.log("werwerewrwerewrwewererwr")

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  build: {
    extractCSS: true
  },
  //serverMiddleware: ['../api/auth'],
  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', '@@'],
  axios: {
    proxy: true
  },
  proxy: {
    // secure: false - нужно только для development!
    '/api': { target: 'https://localhost:8445', secure: false }
  },
  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      }
    }
  }
}
