const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// compression plugin
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

// Coupled with setting NODE_ENV via npm "scripts"
const mode = process.env.NODE_ENV === "production" ? "production" : "development";

// Temporary workaround for "browserslist" bug that is being patched in the near future
// Bug: does not persist with webpack live server
const target = process.env_NODE_ENV === "production" ? "browserslist" : "web";

// * Runs slow for setup, then fast
const sourcemapMode = process.env_NODE_ENV === "production" ? "source-map" : "eval-source-map";

module.exports = {
  mode: mode,
  entry: {
    index: "./src/main.bundler.js",
    assets: "./src/assets.js"
  },
  output: {
    // filename: "[name].bundler.js",
    filename: "[name].bundler.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]"
  },
  devServer: {
    contentBase: "./dist",
    port: "3000",
    // ? Optional
    // to switch to Hot Module Reload
    // turn on hot to true, and liveReload to false
    // hot: true,
    // liveReload: fasle
  },
  module: {
    rules: [
      // # Target: JavaScripts
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          }
        }
      },


      // # Target: Styles
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: ""
          //   }
          // },
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      }
    ]
  },

  // # Plugins
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Contacts Web App",
      template: path.resolve(__dirname, "src", "index.html"),
      inject: "body",
    }),

    // # ONLY for PRODUCTION
    // Otherwise, comment

    // with gzip
    // new CompressionPlugin({
    //   filename: "[path][base].gz",

    //   // include: /src/
    //   // include: /dist/
    //   algorithm: "gzip",

    //   // test: /\.(js|css|html)$/,
    //   test: /\.(js)$/,

    //   // level 9 is the highest fo gzip, other algorithm may vary (see doc)
    //   compressionOptions: {level: 7},
    //   // compressionOptions: {level: 9}

    //   // Only assets bigger than this size are processed (in Bytes)
    //   // threshold: 8192

    //   // Only assets that compress better than this ratio are processed (minRatio = Compressed Size / Original Size)
    //   // - you can use `1` value to process assets that are smaller than the original.
    //   // - Use a value of `Infinity` to process all assets even if they are larger than the original size or their original size is 0 bytes (useful when you are pre-zipping all assets for AWS)
    //   // Use a value of `Number.MAX_SAFE_INTEGER` to process all assets even if they are larger than the original size, excluding assets with their original size is `0` bytes
    //   // minRaiot: 0.8 // Default

    //   // deleteOriginalAssets: true,
    // }),

    // with zilb (Brotl)
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      // test: /\.(js|css|html|svg)$/,
      test: /\.(js)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ],

  // # Misc.
  target: target,
  devtool: sourcemapMode
};