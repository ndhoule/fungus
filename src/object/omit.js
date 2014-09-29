import curry from '../function/curry';
import existy from '../utility/existy';
import isArray from './isArray';
import isObject from './isObject';
import isString from './isString';
import keys from './keys';

/**
 * Creates a hashmap of all input strings, where the strings are the keys.
 *
 * @name parseOmissions
 * @api private
 * @param {Array|String} props TODO
 * @return {Object} TODO
 */
let parseOmissions = function(props) {
  let results = {};

  if (isString(props)) {
    props = [props];
  }

  if (!isArray(props)) {
    props = [];
  }

  let i = props.length;

  while (--i >= 0) {
    // Ignore non-strings
    if (isString(props[i])) {
      results[props[i]] = 1;
    }
  }

  return results;
};

/**
 * Creates a new object composed of the enumerable own properties of the input `object`, omitting
 * any of the named properties.
 *
 * @name omit
 * @api public
 * @category Object
 * @see {@link pick}
 * @param {Array.<string>|string} props The property or properties to omit.
 * @param {Object} object The object to iterate over.
 * @return {Object} A new object mirroring the input `object`, less any of the `props`
 * properties.
 * @example
 * var person = { name: 'Tim', occupation: 'enchanter', scaredOf: 'rabbits' };
 *
 * omit('name', person);
 * //=> { occupation: 'enchanter', scaredOf: 'rabbits' }
 *
 * omit(['name', 'scaredOf'], person);
 * //=> { occupation: 'enchanter' }
 */
let omit = curry(function omit(props, object) {
  if (!existy(object) || !isObject(object)) {
    return {};
  }

  props = parseOmissions(props);
  let result = {};
  let ks = keys(object);
  let i = ks.length;

  while (--i >= 0) {
    if (!props[ks[i]]) {
      result[ks[i]] = object[ks[i]];
    }
  }

  return result;
});

export default omit;
