const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      // errors: false
    },
    proxy: {
      '/api': {
        target: 'http://jenifly.xyz:2266',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      
      '/res': {
        target: 'http://jenifly.xyz:9926',
        changeOrigin: true,
        pathRewrite: {
          '^/res': '/res'
        }
      },
      // '/tools': {
      //   target: 'http://jenifly.xyz:2266',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/tools': '/tools'
      //   },
      //   '/image': {
      //     target: 'http://jenifly.xyz:2266',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/image': '/image'
      //     }
      //   },
      // }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}