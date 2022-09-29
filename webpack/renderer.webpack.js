const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: require('./alias.webpack'),
  },
  module: {
    rules: require('./rules.webpack'),
  },
};
