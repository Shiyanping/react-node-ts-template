const webpack = require('webpack');
module.exports = {
  // 热启动服务器
  devServer: {
    host: 'localhost',
    port: '8080',
    open: true, //自动拉起浏览器
    hot: true, //热加载
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {"^/api": ""} // 将/api重写为""空字符串
      }
    }
    //hotOnly:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
