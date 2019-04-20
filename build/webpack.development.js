const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  devServer: {
    port: '8022',
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3022',
        pathRewrite: { '^/api': '' } // 将/api重写为""空字符串
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
    quiet: true, // necessary for FriendlyErrorsPlugin
    https: false // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'CRM',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/web/index.html')
    }),
     new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8022'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true
    })
  ]
};
