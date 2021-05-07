const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack')
console.log('====================================');
console.log(1111111);
console.log('====================================');
module.exports = {
  webpack: {
    plugins: [
      // 打压缩包
      // new CompressionWebpackPlugin({
      //   algorithm: 'gzip',
      //   test: new RegExp(
      //     '\\.(' +
      //     ['js', 'css'].join('|') +
      //     ')$'
      //   ),
      //   threshold: 1024,
      //   minRatio: 0.8
      // }),
      // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_debugger: true,
      //       drop_console: true,
      //     },
      //   },
      //   sourceMap: false,
      //   parallel: true,
      // }),
    ]
  },
  // babel: {
  //   "plugins": ["effector-logger/babel-plugin"]
  // },
  // plugins: [
  //   "effector-logger/babel-plugin"
  // ]
}