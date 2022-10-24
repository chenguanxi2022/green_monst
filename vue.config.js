const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // https: false, // https
    // hotOnly: false, // 热更新
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // changeOrigin: true, // 代理服务器此时会根据请求的 target 地址修改 Host
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
