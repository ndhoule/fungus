var _ = require('lodash');

module.exports = function(config) {
  'use strict';

  if (process.env.CI && (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY)) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  // Config options shared across all environments
  var baseConfig = {
    basePath: '../..',
    frameworks: ['mocha', 'sinon-chai', 'chai-js-factories', 'chai'],
    logLevel: config.LOG_ERROR,
    port: 9876,
    files: [
      'node_modules/traceur/bin/traceur-runtime.js',
      'dist/browser/fungus.min.js',
      'test/factories/**/*.js',
      'test/plugins/**/*.js',
      'test/unit/**/*.test.js'
    ]
  };

  // Environment-specific configuration
  var envConfig = require(process.env.CI ? './karma-ci.conf.js' : './karma-local.conf.js');

  config.set(_.merge(baseConfig, envConfig));
};
