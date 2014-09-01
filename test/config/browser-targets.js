'use strict';

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
module.exports = {
  // Desktop
  'SL_IE_11': {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  'SL_Chrome': {
    base: 'SauceLabs',
    browserName: 'chrome'
  },
  'SL_Firefox': {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  'SL_Safari': {
    base: 'SauceLabs',
    browserName: 'safari'
  },
  'SL_Opera': {
    base: 'SauceLabs',
    browserName: 'opera'
  },

  // Mobile
  'SL_iPhone': {
    base: 'SauceLabs',
    browserName: 'iphone'
  },
  'SL_Android': {
    base: 'SauceLabs',
    browserName: 'android'
  }
};
