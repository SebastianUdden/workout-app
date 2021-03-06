const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: __dirname,
    filename: 'docs/bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },
      { 
        test: /\.jsx$/, 
        loader: 'babel-loader', 
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader:'style!css!'
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({      
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['docs'] }
    })
  ]
};