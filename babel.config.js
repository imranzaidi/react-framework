const path = require('path');
const { resolve } = require('./webpack.config');

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  [require.resolve('babel-plugin-module-resolver'), {
    root: [path.resolve('src')],
    alias: resolve.alias
  }]
];

const presets = [
  '@babel/preset-env',
  '@babel/preset-react'
];

module.exports = process.env.NODE_ENV === 'test' ? {
  presets: ['react-app'],
  plugins
} : {
  presets,
  plugins
};
