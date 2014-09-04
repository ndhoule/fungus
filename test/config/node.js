'use strict';

var fs = require('fs');
var path = require('path');

var FACTORIES_PATH = path.join(__dirname, '../factories');
var DIST_PATH = path.join(__dirname, '../../dist');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Testing globals
var chai = require('chai');
global.chai = chai;
global.expect = chai.expect;
global.sinon = require('sinon');

// Chai plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-js-factories'));

// Load factories
fs.readdirSync(FACTORIES_PATH)
  .filter(function(filename) {
    return (/.+\.js$/).test(filename);
  })
  .forEach(function(filename) {
    require(path.join(FACTORIES_PATH, path.basename(filename, '.js')));
  });

// Export library
global.fungus = require(path.join(DIST_PATH, 'commonjs/index')).default;
