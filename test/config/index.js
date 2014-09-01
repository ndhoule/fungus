'use strict';

import fnjs from '../../.tmp/compiled/commonjs/index';

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-factories'));

// Export testing globals
global.chai = chai;
global.expect = chai.expect;
global.sinon = require('sinon');

// Factories
require('../factories');

// Export library
global.fnjs = fnjs;
