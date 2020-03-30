const path = require('path');

// NOTE: dependency of /node_modules/v8-compile-cache/v8-compile-cache.js:192:30
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const filesServer = [{
  path: `${path.resolve()}/server`,
  name: 'index.js'
}];
const webpackClientConfigBuilderServer = require('./src/serverConfig');
const webpackConfig = filesServer.map(file => webpackClientConfigBuilderServer(`${file.path}/${file.name}`));

module.exports = webpackConfig;
