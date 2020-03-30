'use strict';

const fs = require('fs');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

if (fs.existsSync(paths.dotEnvFile)) {
  require('dotenv').config({
    path: paths.dotEnvFile
  });
}

const REACT_APP_REGEX = /^REACT_APP_/i;

function getClientEnvironment () {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP_REGEX.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    );
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };
}

function getServerEnvironment () {
  const validServerEnvFlags = [
    'SECRET',
    'SECURE_COOKIE',
    'NO_CACHE',
    'SERVER_DEBUG_LOG'
  ];
  const raw = Object.keys(process.env)
    .filter(key => (validServerEnvFlags.indexOf(key) !== -1 || REACT_APP_REGEX.test(key)))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        NODE_ENV: process.env.NODE_ENV || 'development'
      }
    );
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };
}

module.exports = {
  getClientEnvironment,
  getServerEnvironment
};
