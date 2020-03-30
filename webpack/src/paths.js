'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  'js',
  'json',
  'jsx'
];

const dotEnvFile = fs.existsSync(resolveApp('.env.local')) ? resolveApp('.env.local')
  : resolveApp('.env');

module.exports = {
  dotEnvFile,
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appBuildServer: resolveApp('build/server'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appSrcServer: resolveApp('server'),
  moduleFileExtensions
};
