const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let webpackconfig = {
  // 入口文件
  entry: {
    app: './src/web/index.js'
  },
  // 编译jsx
  module: {
    rules: [
      {
        test: /.jsx$/, //使用loader的目标文件。这里是.jsx
        loader: 'babel-loader'
      },
      {
        test: /.(js)$/, //使用loader的目标文件。这里是.js
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让 babel 去处理其下面的js文件
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx']
  },
  // 输出到dist文件夹, 文件名字为 bundle.js
  output: {
    filename: 'scripts/[name].[hash].js',
    publicPath: '',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash].css',
      chunkFilename: 'styles/[id].css'
    }),
    new HtmlWebpackPlugin({
      template: 'src/web/template/index.html'
    }) // 生成一个html页面，同时在webpack编译的时候。把我们所生成的 entry 都注入到这个 html 页面中,路径都是根据我们 output 配置的来走的。
  ]
};

module.exports = merge(webpackconfig, _mergeConfig);
