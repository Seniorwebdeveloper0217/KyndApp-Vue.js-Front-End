/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

module.exports = {
  publicPath: "/",
  transpileDependencies: ["resize-detector"],
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .options({
        fix: true
      });
  },
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp("\\.(js|css)$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    resolve: {
      extensions: [".js", ".vue", ".json"],
      // TODO: Integrate on production
      alias: {
        styles: path.resolve(__dirname, "src/assets/scss")
      }
    },
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  },
  // options...
  devServer: {
    proxy: {
      "^/api": {
        target:
          "https://w5of55cia4.execute-api.us-east-1.amazonaws.com/dev/graphql",
        ws: true,
        changeOrigin: true
      }
    }
  }
};
