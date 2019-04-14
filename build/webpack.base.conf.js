const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const _PROD_ = process.env.NODE_ENV === 'production';

const resolve = dir => {
  return path.resolve(process.cwd(), dir);
};

module.exports = {
  entry: {
    app: resolve('src/web/index.tsx')
  },

  output: {
    path: resolve('dist'), // string
    publicPath: '', // root Dir
    sourceMapFilename: '[name].map',
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
    filename: 'static/js/[name].[hash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { ie: 9 },
                ignoreBrowserslistConfig: true,
                useBuiltIns: false,
                modules: false,
                exclude: ['transform-typeof-symbol']
              }
            ],
            [
              '@babel/preset-react',
              {
                targets: 'last 2 versions, ie 11',
                modules: false
              }
            ],
            ['@babel/preset-typescript']
          ],
          plugins: [['@babel/plugin-syntax-dynamic-import'], ['@babel/plugin-proposal-decorators', { legacy: true }], ['@babel/plugin-proposal-class-properties', { loose: true }]]
        }
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
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
    modules: ['node_modules', resolve('src')],
    // 用于查找模块的目录
    extensions: ['.js', '.ts', '.tsx'],

    alias: {
      '@assets': resolve('src/web/assets'),
      '@components': resolve('src/web/components'),
      '@constants': resolve('src/web/constants'),
      '@models': resolve('src/web/models'),
      '@pages': resolve('src/web/pages'),
      '@utils': resolve('src/web/utils')
    }
  },

  context: __dirname, // string（绝对路径！）
  // webpack 的主目录
  // entry 和 module.rules.loader 选项
  // 相对于此目录解析

  target: 'web', // default

  // externals: ["react", /^@angular\//],
  // 不要遵循/打包这些模块，而是在运行时从环境中请求他们

  stats: 'errors-only',
  // 精确控制要显示的 bundle 信息

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
          test: /[\\/]node_modules\/(react|mobx)[\\/]/,
          priority: 1,
          chunks: 'all'
        },
        antd: {
          name: 'vendor1',
          test: /[\\/]node_modules\/antd[\\/]/,
          priority: 0,
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
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css'
    })
  ]
};
