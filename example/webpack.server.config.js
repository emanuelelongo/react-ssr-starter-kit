const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./src/index.js'],

  output: {
    path: path.resolve('build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules\.*/,
        loader: 'babel-loader',
        options: {
          presets: ['react', ['env', { targets: { node: 'current' } }], 'stage-0']
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=public/[name].[ext]'
      }
    ]
  },
};
