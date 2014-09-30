'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var path = require('path');
var requireDirectory = require('require-directory');

var DIST_PATH = path.join(__dirname, '../../dist');
var FACTORIES_PATH = path.join(__dirname, '../factories');
var PLUGINS_PATH = path.join(__dirname, '../plugins');

/**
 * Globalize Chai test framework
 */
var chai = require('chai');
global.chai = chai;
global.expect = chai.expect;
global.sinon = require('sinon');

/**
 * Chai plugins
 */
chai.use(require('sinon-chai'));
chai.use(require('chai-js-factories'));
requireDirectory(module, PLUGINS_PATH);

/**
 * Fixtures and factories
 */
requireDirectory(module, FACTORIES_PATH);

/**
 * Export Fungus library
 */
global.fungus = require(path.join(DIST_PATH, 'commonjs/index')).default;
