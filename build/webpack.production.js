'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const _PROD_ = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['index.html', 'static*.*']
    }),
    new OptimizeCSSAssetsPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: _PROD_ ? true : false
        },
        output: {
          comments: false
        }
      },
      parallel: true
    }),
    new HtmlWebpackPlugin({
      title: 'CRM',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/web/index.html'),
      inject: true,
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    minimize: _PROD_ ? true : false,
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        react: {
          name: 'vendor',
          test: /[\\/]node_modules\/(react|redux)[\\/]/,
          priority: 1,
          chunks: 'all'
        },
        antd: {
          name: 'chunk-antd',
          test: /[\\/]node_modules\/antd[\\/]/,
          priority: 20,
          chunks: 'all'
        },
        default: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: -10,
          reuseExistingChunk: true
        }
      }
    }
  }
};
