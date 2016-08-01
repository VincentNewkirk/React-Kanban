var path = require('path');
var webpack = require('webpack');

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true',
    './public/lib/react.js'
  ],
  output: { path: '/', publicPath: 'http://localhost:3000/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },

  plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      //new webpack.ResolverPlugin new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin 'bower.json', ['main']
      //new webpackStats 'webpack.json'
  ],
  target: 'web'


};

module.exports = config;