/*
 * @Author: Yangliwei
 * @Date: 2020-05-26 16:01:45
 * @LastEditTime: 2020-06-03 09:56:55
 * @LastEditors: Yangliwei
 * @FilePath: \express_platform_h5\vue.config.js
 * @Just Think
 * @Description:
 */

const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const ThemeColorReplacerPlugin = require("./webpack_plugins/webpack_theme_plugin");
const config = require("./src/config.js");
module.exports = {
  publicPath: "./",
  outputDir: "admin",
  devServer: {
    port: 8080,
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: config.baseurl, //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      ThemeColorReplacerPlugin(),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        // 只处理大于xx字节 的文件，默认：0
        threshold: 10240,
        // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
        minRatio: 0.8, // 默认: 0.8
        // 是否删除源文件，默认: false
        deleteOriginalAssets: false
      })
    ]
  }
};
