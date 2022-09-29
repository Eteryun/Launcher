const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js'],
    alias: require('./alias.webpack'),
  },
  entry: './src/main/index.ts',
  module: {
    rules: require('./rules.webpack'),
  },
};
