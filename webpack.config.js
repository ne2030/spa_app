const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  // ignore built-in module to be bundled and node_modules
  target: 'node',
  externals: [nodeExternals()],
  context: __dirname,
  node: { __dirname: false },

  entry: "./server.js",

  output: {
    path: path.join(__dirname, "dist", "[hash]"),
    publicPath: "dist/[hash]",
    filename: "app.[hash].bundle.js",
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        },
        mangle: {
          screw_ie8: true
        },
        output: {
          comments: false,
          screw_ie8: true
        }
    }),
  ],

  module: {
    preLoader: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    }]
  }
};
