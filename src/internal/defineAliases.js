import forEach from '../collection/forEach';
import isArray from '../object/isArray';
import isString from '../object/isString';

var defineAliases = function(aliases, target) {
  if (!isArray(aliases)) {
    throw new Error('Expected an array');
  }

  forEach(function(alias) {
    if (!isString(alias)) {
      throw new TypeError('The `aliases` argument must be a string or an array of strings.');
    }
  }, aliases);

  Object.defineProperties(target, {
    _aliases: {
      value: aliases.slice().sort(),
      configurable: false,
      enumerable: false,
      writable: false
    }
  });
};

export default defineAliases;
