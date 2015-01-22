'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

/**
 * Module dependencies.
 */

var path = require('path');
var requireDirectory = require('require-directory');

/**
 * Constants.
 */

var ROOT_PATH = path.join(__dirname, '../..');
var FACTORIES_PATH = path.join(__dirname, '../factories');
var PLUGINS_PATH = path.join(__dirname, '../plugins');

/**
 * Testing globals.
 */

var chai = global.chai = require('chai');
global.expect = chai.expect;
global.sinon = require('sinon');

/**
 * Chai plugins.
 */

chai.use(require('sinon-chai'));
chai.use(require('chai-js-factories'));
requireDirectory(module, PLUGINS_PATH);

/**
 * Load fixtures and factories.
 */

requireDirectory(module, FACTORIES_PATH);

/**
 * Globalize Fungus.
 */

global.fungus = require(path.join(ROOT_PATH, 'src/index'));
