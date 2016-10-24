const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  entry: {
    bundle: './components/index'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: 'public',
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ENV: JSON.stringify(ENV)
      }
    })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=lodash'
      },
      {
        test: /\.scss$/,
        loaders: ['style',
                  'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]',
                  'sass']
      },
      {
        test: /\.css$/,
        loaders: ['style',
                  'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url'
      },
      {
        test: /index\.js$/,
        loader: 'string-replace',
        query: {
          search: '#! /usr/bin/env node',
          replace: ''
        }
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
