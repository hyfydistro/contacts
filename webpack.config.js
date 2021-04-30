const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ""
            }
          },
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "Contacts Web App",
      template: path.resolve(__dirname, "src", "index.html"),
      inject: "body",
    })
  ],

  // # Misc.
  target: target,
  devtool: sourcemapMode
};