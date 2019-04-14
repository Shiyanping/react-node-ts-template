const path = require('path'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  webpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackConfig, {
  mode: 'development',
  devServer: {
    port: '8022',
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3022',
        pathRewrite: {"^/api": ""} // 将/api重写为""空字符串 
      }
    },
    contentBase: path.join(__dirname, '../dist'), // boolean | string | array, static file location
    stats: {
      color: true
    },
    compress: true, // enable gzip compression
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    // hotOnly: true,
    // inline: true,
    https: false // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'CRM',
      filename: 'index.html',
      template: '../src/web/index.html'
    })
  ]
});
