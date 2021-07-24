const path = require("path")
const { alias, extensions, tsReactRule } = require('./webpack.common')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  module: {
    rules: [ tsReactRule ],
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions,
    alias,
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    inline: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    port: 3005
  },
  plugins: [
    new HtmlWebPackPlugin({
      inject: true,
      template: path.join(__dirname, 'public', 'index.html')
    }),
  ]
};
