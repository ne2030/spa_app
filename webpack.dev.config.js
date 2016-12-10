const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {

  target: 'node',
  externals: [nodeExternals()],
  node: { __dirname: false },

  entry: [
    './server.js',
    'webpack-dev-server/client?http://0.0.0.0:3002',
    'webpack/hot/only-dev-server'
  ],

  output: {
    path: '/',
    filename: 'app.js'
  },

  devServer: {
    hot: true,
    filename: 'app.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './dist',
    proxy: {
      "**": "http://localhost:8000"
    }
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/ ,
      query: {
        cacheDirectory: true,
        presets: ['es2015']
      }
    }]
  }
};
