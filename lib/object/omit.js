import { curry } from '../function/curry';
import { isArray } from './isArray';
import { isString } from './isString';
import { keys } from './keys';

/**
 * Creates a hashmap of all input strings, where the strings are the keys.
 *
 * @name parseOmissions
 * @api internal
 * @param {Array|String} omissions TODO
 * @return {Object} TODO
 */
let parseOmissions = function(omissions) {
  let results = {};

  if (isString(omissions)) {
    omissions = [omissions];
  }

  if (!isArray(omissions)) {
    omissions = [];
  }

  let i = omissions.length;

  while (--i >= 0) {
    // Ignore non-strings
    if (isString(omissions[i])) {
      results[omissions[i]] = 1;
    }
  }

  return results;
};

/**
 * Creates a new object composed of the enumerable own properties of the input `object`, omitting
 * any of the named `omissions` properties.
 *
 * @name omit
 * @api public
 * @category Object
 * @param {Array|String} omissions The property or properties to omit.
 * @param {Object} object The properties to omit.
 * @return {Object} A new object mirroring the input `object`, less any of the `omissions`
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
export let omit = curry(function omit(omissions, object) {
  omissions = parseOmissions(omissions);

  let result = {};
  let ks = keys(object);
  let i = ks.length;

  while (--i >= 0) {
    if (!omissions[ks[i]]) {
      result[ks[i]] = object[ks[i]];
    }
  }

  return result;
});
