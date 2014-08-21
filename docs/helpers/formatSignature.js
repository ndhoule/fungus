'use strict';

var _ = require('lodash');
var formatParam = require('./formatParam');

module.exports = function formatSignature(params) {
  return _.map(params, formatParam).join(', ');
};
