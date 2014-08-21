import { curry } from '../function/curry';
import { isArray } from '../object/isArray';
import { keys } from '../object/keys';

/**
 * Internal implementation of forEach. Works on arrays and array-like data
 * structures.
 *
 * @name arrayEach
 * @api private
 * @param {Function} fn The function to execute per iteration.
 * @param {Array} array The array to iterate over.
 * @return {undefined}
 */
let arrayEach = function arrayEach(fn, array) {
  let i = -1;
  let length = array.length;

  while (++i < length) {
    // Break early if the iterator returns false
    if (fn(array[i], i, array) === false) {
      break;
    }
  }
};

/**
 * Internal implementation of forEach. Works on objects.
 *
 * @name baseEach
 * @api private
 * @param {Function} fn The function to execute per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined}
 */
let baseEach = function baseEach(fn, object) {
  let ks = keys(object);
  let length = ks.length;
  let i = -1;

  while (++i < length) {
    // Break early if the iterator returns false
    if (fn(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
};

/**
 * Iterates over an input collection, executing the callback `fn` for each
 * element. Callbacks can trigger an early exit to iteration by explicitly
 * returning `false`.
 *
 * @name forEach
 * @api public
 * @category Collection
 * @param fn
 * @param {Array,Object} collection
 * @return {undefined} Because `forEach` is run only for side effects, we always
 * return `undefined`.
 */
// TODO: Check for `collection.length`, rather than testing if it's an array
// This could be `isArrayLike`
export let forEach = curry(function forEach(fn, collection) {
  return isArray(collection) ? arrayEach(fn, collection) : baseEach(fn, collection);
});
