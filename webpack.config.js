const merge = require('webpack-merge');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./build/webpack.${_mode}.js`);

const resolve = dir => {
  return path.resolve(process.cwd(), dir);
};

const webpackBaseConfig = {
  entry: {
    app: resolve('src/web/index.tsx')
  },
  output: {
    path: resolve('dist'), // 打包文件夹
    publicPath: '/', // 输出文件引用静态资源的公共目录，可以在使用 CDN 资源时使用
    sourceMapFilename: '[name].map',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    filename: 'static/js/[name].[hash].js' // 用于输出文件的文件名
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        // test: /\.(j|t)sx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader'
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
    alias: {
      '@assets': resolve('src/web/assets'),
      '@components': resolve('src/web/components'),
      '@constants': resolve('src/web/constants'),
      '@models': resolve('src/web/models'),
      '@pages': resolve('src/web/pages'),
      '@utils': resolve('src/web/utils')
    },
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: ['node_modules', resolve('src')],
    // 用于查找模块的目录
    extensions: ['.js', '.ts', '.tsx', 'jsx']
  },
  context: __dirname, // string（绝对路径！）
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css'
    })
  ]
};
module.exports = merge(_mergeConfig, webpackBaseConfig);
