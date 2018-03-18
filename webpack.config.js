/* eslint-disable */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractSass = new ExtractTextPlugin({
    filename: "[name].[chunkhash].css",
    disable: process.env.NODE_ENV === "development"
})

module.exports = {
  devtool: 'source-map',

  entry: {
    app: "./src/index.tsx",
    vendor: ["react", "react-dom", "bulma"],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              emitErrors: true,
            }
          },
          /*'babel-loader?cacheDirectory=true',*/
          'awesome-typescript-loader'
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: { 
                  minimize: true
              }
            },
            {
              loader: 'sass-loader?sourceMap'
            }
          ],
          fallback:'style-loader'
        })
      },
      {
        test: /\.(svg|eot|woff|woff2|ttf|png|jpg|gif|txt)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass'],
    modules: [
      'node_modules'
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'bulma' }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),

    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks(module, count) {
          return count >= 2;
      },
    }),
    extractSass
  ],
}
