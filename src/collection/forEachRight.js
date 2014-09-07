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
 * TODO: Note iteration order
 * [iteration order]: http://mdn.io/for...in#Array_iteration_and_for...in
 *
 * @name forEachRight
 * @api public
 * @category Collection
 * @alias eachRight
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {undefined} Because `forEach` is run only for side effects, it always returns
 * `undefined`.
 * @example
 * TODO
 */
var forEachRight = curry(function forEachRight(iterator, collection) {
  return (isArrayLike(collection) ? arrayEachRight : baseEachRight).call(this, iterator, collection);
});

export default forEachRight;
