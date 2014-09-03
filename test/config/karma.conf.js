module.exports = function(config) {
  'use strict';

  if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.log('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    process.exit(1);
  }

  /**
   * TODO: Browser support should look something like this (list not final):
   *
   * - IE 9, 10, 11
   * - Chrome current, current - 1
   * - Safari current, current - 1
   * - Firefox current, current - 1
   * - Opera current, current - 1
   * - iOS 7.x, 6.x, 5.x (?)
   * - Android 4.x (?)
   */

  // See for config:
  // - https://saucelabs.com/platforms
  // - https://github.com/karma-runner/karma-sauce-launcher#customlaunchers-config-properties
  var customLaunchers = {
    // Desktop
    'SL_IE_9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    'SL_IE_10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10'
    },
    'SL_IE_11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    },
    'SL_Chrome_37': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '37'
    },
    'SL_Firefox_31': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '31'
    },
    'SL_Safari_7': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7'
    },
    'SL_Opera_12': {
      base: 'SauceLabs',
      browserName: 'opera',
      platform: 'Windows 7',
      version: '12'
    },

    // Mobile
    'SL_iPhone_7.1': {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    'SL_Android': {
      base: 'SauceLabs',
      browserName: 'android',
      version: '4.4'
    }
  };

  config.set({
    basePath: '../..',
    frameworks: ['mocha', 'sinon-chai', 'chai-js-factories', 'chai'],
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
