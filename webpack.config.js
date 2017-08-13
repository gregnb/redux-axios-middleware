const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].bundle.js"
  },
  devServer: {
    disableHostCheck: true,
    compress: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: "0.0.0.0",
    port: 3030
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin('css/styles.css')
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.less$/,
        use:  ExtractTextPlugin.extract({
          use: [
            { loader: "css-loader", options: { sourceMap: true } }, 
            { loader: "less-loader", options: { sourceMap: true } }
          ]
        })
      }
    ]
  }
};
