import curry from '../function/curry';
import isArrayLike from '../object/isArrayLike';
import keys from '../object/keys';

/**
 * Internal implementation of forEach. Works on arrays and array-like data
 * structures.
 *
 * @name arrayEachRight
 * @api private
 * @param {Function} iterator The function to execute per iteration.
 * @param {Array} array The array to iterate over.
 * @return {undefined}
 */
var arrayEachRight = function arrayEachRight(iterator, array) {
  var i = array.length;

  while (--i >= 0) {
    // Break early if the iterator returns false
    if (iterator(array[i], i, array) === false) {
      break;
    }
  }
};

/**
 * Internal implementation of forEach. Works on objects.
 *
 * @name baseEach
 * @api private
 * @param {Function} iterator The function to execute per iteration.
 * @param {Object} object The object to iterate over.
 * @return {undefined}
 */
var baseEachRight = function baseEachRight(iterator, object) {
  var ks = keys(object);
  var i = ks.length;

  while (--i >= 0) {
    // Break early if the iterator returns false
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
 * **Note**: Iteration order over non-indexed collections is not guaranteed to be consistent across
 * platforms. See [this MDN article][iteration order] for more details.
 *
 * [iteration order]: http://mdn.io/for...in#Array_iteration_and_for...in
 * @name forEachRight
 * @api public
 * @category Collection
 * @alias eachRight
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object|string} collection The collection to iterate over.
 * @return {undefined} Because `forEach` is run only for side effects, it always returns
 * `undefined`.
 * @example
 * var log = console.log.bind(console);
 *
 * forEachRight(log, ['a', 'b', 'c']);
 * //-> 'c', 2, ['a', 'b', 'c']
 * //-> 'b', 1, ['a', 'b', 'c']
 * //-> 'a', 0, ['a', 'b', 'c']
 *
 * forEachRight(log, 'tim');
 * //-> 't', 2, 'tim'
 * //-> 'i', 1, 'tim'
 * //-> 'm', 0, 'tim'
 *
 * // Note: Iteration order not guaranteed across environments
 * forEachRight(log, { name: 'tim', occupation: 'enchanter' });
 * //-> 'tim', 'name', { name: 'tim', occupation: 'enchanter' }
 * //-> 'enchanter', 'occupation', { name: 'tim', occupation: 'enchanter' }
 */
var forEachRight = curry(function forEachRight(iterator, collection) {
  return (isArrayLike(collection) ? arrayEachRight : baseEachRight).call(this, iterator, collection);
});

export default forEachRight;
