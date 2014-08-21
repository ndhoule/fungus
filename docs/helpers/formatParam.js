'use strict';

var formatTypes = require('./formatTypes');

module.exports = function formatParam(param) {
  return [param.name, ':', formatTypes(param.types)].join(' ');
};
