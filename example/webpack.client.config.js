const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['./src/app/index.js', './src/app/index.css'],

  output: {
    path: path.resolve('build/public'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\.*/,
        loader: 'babel-loader',
        options: {
          presets: ['react', ['env', { targets: { browsers: ['ie >= 11'] } }], 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [new ExtractTextPlugin('bundle.css')]
};
