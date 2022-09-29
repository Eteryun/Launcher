const path = require('path');

module.exports = {
  '~': path.resolve(__dirname, '..', 'src/'),
  '@common': path.resolve(__dirname, '..', 'src/common'),
  '@main': path.resolve(__dirname, '..', 'src/main'),
  '@renderer': path.resolve(__dirname, '..', 'src/renderer'),
};
