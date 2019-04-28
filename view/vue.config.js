module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      // errors: false
    },
    proxy: {
      '/api': {
        target: 'http://192.168.1.66:2266',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/image': {
        target: 'http://192.168.1.66:2266',
        changeOrigin: true,
        pathRewrite: {
          '^/image': '/image'
        }
      },
      '/tools': {
        target: 'http://192.168.1.66:2266',
        changeOrigin: true,
        pathRewrite: {
          '^/tools': '/tools'
        }
      }
    }
  }
}