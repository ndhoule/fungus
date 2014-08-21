'use strict';

module.exports = function formatTypes(types) {
  return '(' + types.join('|') + ')';
};
