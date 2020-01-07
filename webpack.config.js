var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV==='dev';

var browserConfig = {
  mode: 'development',
  entry: './src/app/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader' },
      { 
        test: /\.(css)$/, 
        exclude: '/public/css/',
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options:{
              sourceMap: true,
              modules:{
                  localIdentName: '[local]__[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    }),
    new MiniCssExtractPlugin({
      filename: './css/styles.css'
    })
  ],
  watchOptions:{
      poll: true
  }
}

var serverConfig = {
  mode: 'development',
  entry: './src/server.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  devtool:'source-map',
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ], 
        use: 'babel-loader' 
      },
      { 
        test: /\.(css)$/, 
        exclude: '/public/css/',
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options:{
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options:{
              sourceMap: true,
              modules:{
                  localIdentName: '[local]__[hash:base64:5]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    }),
    new MiniCssExtractPlugin({
      filename: './public/css/styles.css'
    })
  ],
  watchOptions:{
      poll: true
  }
}

module.exports = [browserConfig, serverConfig]