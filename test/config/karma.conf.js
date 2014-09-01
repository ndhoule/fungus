module.exports = function(config) {
  'use strict';

  var customLaunchers = require('./browser-targets');

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  config.set({
    basePath: '../..',

    frameworks: ['mocha', 'sinon-chai', 'chai-factories', 'chai'],

    files: [
      'dist/browser.min.js',
      'test/factories/**/*.js',
      'test/unit/**/*.test.js'
    ],

    exclude: [],

    preprocessors: {},

    reporters: ['progress', 'saucelabs'],

    port: 9876,

    colors: true,

    // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_ERROR,

    autoWatch: false,

    captureTimeout: 120000,

    sauceLabs: {
      testName: 'Fungus',
      recordScreenshots: false,
      tags: ['fungus']
    },

    browsers: Object.keys(customLaunchers),

    customLaunchers: customLaunchers,

    singleRun: true
  });
};
