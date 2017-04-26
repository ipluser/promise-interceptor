var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'promise-interceptor.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'promise-interceptor',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['es2015'],
      },
    }],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
}
