const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss' ]
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './index.html',
        filename: './dist/index.html'
    })
  ],

};