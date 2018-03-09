const path = require('path');

module.exports = {
  entry: './src/app/index.js',

  output: {
    path: path.resolve('build/assets'),
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
      }
    ]
  }
};