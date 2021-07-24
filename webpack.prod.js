const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {
  alias,
  extensions,
  tsReactRule,
} = require('./webpack.common');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  resolve: {
    extensions,
    alias,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: 'body',
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [tsReactRule],
  },
};
