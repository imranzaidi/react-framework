const path = require('path');

// NOTE: dependency of /node_modules/v8-compile-cache/v8-compile-cache.js:192:30
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const files = [{
  path: `${path.resolve()}/src`,
  name: 'clientEntry.js'
}];
const webpackClientConfigBuilder = require('./src/clientConfig');
const webpackConfig = files.map(file => webpackClientConfigBuilder(`${file.path}/${file.name}`));

module.exports = webpackConfig;
