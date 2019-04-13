const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
          path.join(__dirname, '../node_modules') // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
        ]
      }
    ]
  },
  // 输出到dist文件夹, 文件名字为 bundle.js
  output: {
    filename: '[name].[hash].js',
    publicPath: '',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/web/index.html'
    }) // 生成一个html页面，同时在webpack编译的时候。把我们所生成的 entry 都注入到这个 html 页面中,路径都是根据我们 output 配置的来走的。
  ]
};
