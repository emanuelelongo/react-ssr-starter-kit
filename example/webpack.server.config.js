const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./src/index.js'],
  output: {
    path: path.resolve('build'),
    filename: 'index.js'
  },
  node: {
    __dirname: false
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
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([ {from: 'src/public', to: 'public'} ])
  ]
};
