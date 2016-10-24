const webpack = require('webpack');

module.exports = {
  entry: './components/index',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.scss$/, loaders: ['style', 'css?modules&importLoaders=3&localIdentName=[name]-[local]-[hash:base64:5]', 'sass'] },
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
};
