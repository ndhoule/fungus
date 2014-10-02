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

// See for config options:
// - https://saucelabs.com/platforms
// - https://github.com/karma-runner/karma-sauce-launcher#customlaunchers-config-properties
module.exports = {
  colors: false,
  reporters: ['dots', 'saucelabs'],
  autoWatch: false,
  singleRun: true,
  // FIXME: Sauce labs does not support Websockets; remove this line when they do
  transports: ['xhr-polling'],
  browserDisconnectTimeout: 10000,
  browserDisconnectTolerance: 3,
  browserNoActivityTimeout: 30000,
  // Use a liberal timeout for Sauce Labs
  captureTimeout: 0,
  sauceLabs: {
    testName: 'Fungus',
    timeout: 600, // 10 minutes
    recordScreenshots: false,
    build: 'Travis #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
    startConnect: false,
    tags: ['fungus', 'travis', 'ci'],
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers
};
