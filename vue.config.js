
module.exports = {
  lintOnSave: false,
  publicPath: '/vue-ipr/',

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },

  transpileDependencies: [
    'quasar'
  ]
}
