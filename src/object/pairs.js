import existy from '../utility/existy';
import keys from './keys';

/**
 * Iterates over all enumerable own properties of an `object`, creating an array for each property
 * on `object`, and returning an array of all these pairs.
 *
 * Each subarray has as its first element the key at which a value was located in the input
 * `object`, and as it ssecond element the value.
 *
 * @name pairs
 * @api public
 * @category Object
 * @param {Object} object The object to extract values from.
 * @return {Array.<Array>} An array containing all the enumerable own key-value pairs on `object`.
 * @example
 * var person = { name: 'Tim', occupation: 'enchanter' };;
 *
 * // NOTE: property order not guaranteed across environments
 * pairs(person);
 * //=> [ ['name', 'Tim'], ['occupation', 'enchanter'] ]
 */
var pairs = function pairs(object) {
  if (!existy(object)) {
    return [];
  }

  var results = [];
  var ks = keys(object);
  var i = -1;

  while (++i < ks.length) {
    results[i] = [ks[i], object[ks[i]]];
  }

  return results;
};

export default pairs;
