const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// const notifier = require("node-notifier");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
module.exports = {
  output: {
    filename: "scripts/[name].bundule.js"
  },
  devServer: {
    port: "8022",
    host: "localhost",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3022",
        pathRewrite: { "^/api": "" } // 将/api重写为""空字符串
      }
    },
    contentBase: path.join(__dirname, "../dist"), // boolean | string | array, static file location
    stats: {
      color: true
    },
    compress: true,
    historyApiFallback: true,
    hot: true,
    // hotOnly: true,
    // inline: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    https: false // true for self-signed, object for cert authority
    // noInfo: true, // only errors & warns on hot reload
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "CRM",
      filename: "index.html",
      template: path.resolve(__dirname, "../src/web/index.html")
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running here http://localhost:8022"]
        // notes: ["开发环境的Mock数据请务必与服务器报纸一致"]
      },
      clearConsole: true,
      onErrors: (severity, errors) => {
        // if (severity !== "error") {
        //   return;
        // }
        const error = errors[0];
        // notifier.notify({
        //   title: "Webpack error",
        //   message: severity + ": " + error.name,
        //   subtitle: error.file || "",
        //   // icon: ICON
        // });
        new WebpackBuildNotifierPlugin({
          title: "配置环境",
          logo: resolve("../favicon.png"),
          suppressSuccess: true
        });
      }
    })
  ]
};
