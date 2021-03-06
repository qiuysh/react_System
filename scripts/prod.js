const merge = require("webpack-merge");
const base = require("./base.js");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const os = require("os");

module.exports = merge(base, {
  mode: "production",
  optimization: {
    minimizer: [
      // 用于配置 minimizers 和选项
      new UglifyJsPlugin({
        cache: true,
        parallel: os.cpus().length - 1,
        sourceMap: false, // set to true if you want JS source maps
        uglifyOptions: {
          drop_console: true,
          drop_debugger: true,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),

      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 3000000,
      chunks: "all",
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: {
          name: "vendors",
          test: "vendors",
          priority: -1,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/styles/[name]_[chunkhash:8].css",
    }),

    new webpack.HashedModuleIdsPlugin(), // 实现持久化缓存
  ],
});
