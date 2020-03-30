const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.[tj]sx'],
    webpackFinal: async (config, { configType }) => {
        // To add SASS support: https://storybook.js.org/docs/configurations/custom-webpack-config/#examples
        config.module.rules.push({
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: path.resolve(__dirname, '../'),
        });
    
        // Return the altered config
        return config;
      },
};