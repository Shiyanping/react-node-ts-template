const merge = require("webpack-merge");
const { join, resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode == "production" ? true : false;
const webpackBaseConfig = {
  entry: {
    // react: ["react", "react-router-dom"],
    // mobx: ["mobx", "mobx-react-lite"],
    app: resolve("src/web/index.tsx")
  },
  output: {
    path: join(__dirname, "./dist/assets"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx)$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
        ]
      }
    ]
  },
  externals: {
    react: "React",
    "react-router-dom": "ReactRouterDOM",
    mobx: "mobx",
    // "mobx-react-lite": "mobx-react-lite"
  },
  optimization: {
    minimize: _modeflag ? true : false,
    runtimeChunk: {
      name: "runtime"
    },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        // antd: {
        //   name: "antd",
        //   test: /[\\/]node_modules\/antd[\\/]/,
        //   priority: 20,
        //   chunks: "all"
        // },
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: "commons"
        }
      }
    }
  },
  resolve: {
    alias: {
      "@assets": resolve("src/web/assets"),
      "@components": resolve("src/web/components"),
      "@constants": resolve("src/web/constants"),
      "@models": resolve("src/web/models"),
      "@pages": resolve("src/web/pages"),
      "@utils": resolve("src/web/utils")
    },
    modules: ["node_modules", resolve("src")],
    extensions: [".js", ".ts", ".tsx", "jsx"]
  },
  context: __dirname, // string（绝对路径！）
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css",
      chunkFilename: _modeflag
        ? "styles/[name].[contenthash:5].css"
        : "styles/[name].css"
    })
  ]
};
module.exports = merge(_mergeConfig, webpackBaseConfig);