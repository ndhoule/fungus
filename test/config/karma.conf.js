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
    reporters: ['dots', 'saucelabs'],
    colors: true,
    port: 9876,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 30000,
    captureTimeout: 0,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true,

    files: [
      'dist/browser.min.js',
      'test/factories/**/*.js',
      'test/unit/**/*.test.js'
    ],

    // Local development Sauce options
    sauceLabs: {
      testName: 'Fungus',
      tags: ['fungus'],
      timeout: 600, // 10 mins
      startConnect: true,
      recordScreenshots: false
    },

    browsers: Object.keys(customLaunchers),

    customLaunchers: customLaunchers
  });

  if (process.env.CI) {
    var buildLabel = 'Travis #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')';

    // Use Sauce Labs' timeout
    config.captureTimeout = 0;
    config.sauceLabs.build = buildLabel;
    config.sauceLabs.startConnect = false;
    config.sauceLabs.tags.push('ci');
    config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;

    // FIXME: Sauce labs does not support Websockets; remove this line when they do
    config.transports = ['xhr-polling'];
  }
};
