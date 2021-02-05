const path = require('path');

module.exports = {
  mode: 'production',
  entry: './server.js',
  externals: [/(node_modules|main\..*\.js)/],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'api.server.js'
  },
  ignoreWarnings: [
    {
      message: /the request of a dependency is an expression/,
    },
  ],
  target: 'node'
};