import curry from '../function/curry';
import isArrayLike from '../object/isArrayLike';
import keys from '../object/keys';

/**
 * Internal implementation of `forEach`. Works on arrays and array-like data structures.
 *
 * @name arrayEach
 * @api private
 * @param {Function} iterator The function to execute per iteration.
 * @param {Array} array The array(-like) structure to iterate over.
 * @return {undefined}
 */
var arrayEach = function arrayEach(iterator, array) {
  var i = -1;
  var length = array.length;

  while (++i < length) {
    // Allow users to return `false` to end iteration early
    if (iterator(array[i], i, array) === false) {
      break;
    }
  }
};

/**
 * Internal implementation of `forEach`. Works on objects.
 *
 * @name baseEach
 * @api private
 * @param {Function} iterator The function to execute per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined}
 */
var baseEach = function baseEach(iterator, object) {
  var ks = keys(object);
  var length = ks.length;
  var i = -1;

  while (++i < length) {
    // Allow users to return `false` to end iteration early
    if (iterator(object[ks[i]], ks[i], object) === false) {
      break;
    }
  }
};

/**
 * Iterate over an input collection, invoking an `iterator` function for each element in the
 * collection and passing to it three arguments: `(value, index, collection)`. The `iterator`
 * function can end iteration early by returning `false`.
 *
 * @name forEach
 * @api public
 * @alias each
 * @see {@link forEachRight}
 * @category Collection
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object|string} collection The collection to iterate over.
 * @return {undefined} Because `forEach` is run only for side effects, always return `undefined`.
 * @example
 * var log = console.log.bind(console);
 *
 * forEach(log, ['a', 'b', 'c']);
 * //-> 'a', 0, ['a', 'b', 'c']
 * //-> 'b', 1, ['a', 'b', 'c']
 * //-> 'c', 2, ['a', 'b', 'c']
 * //=> undefined
 *
 * forEach(log, 'tim');
 * //-> 't', 2, 'tim'
 * //-> 'i', 1, 'tim'
 * //-> 'm', 0, 'tim'
 * //=> undefined
 *
 * // Note: Iteration order not guaranteed across environments
 * forEach(log, { name: 'tim', occupation: 'enchanter' });
 * //-> 'tim', 'name', { name: 'tim', occupation: 'enchanter' }
 * //-> 'enchanter', 'occupation', { name: 'tim', occupation: 'enchanter' }
 * //=> undefined
 */
var forEach = curry(function forEach(iterator, collection) {
  return (isArrayLike(collection) ? arrayEach : baseEach).call(this, iterator, collection);
});

export default forEach;
