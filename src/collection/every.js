import curry from '../function/curry';
import forEach from './forEach';
import isFunction from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Accepts a test function and a collection, and returns true if all elements in the collection
 * return a truthy value when run through the test function.
 *
 * @name every
 * @api public
 * @category Collection
 * @alias all
 * @see {@link some}
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {boolean} Returns `true` if any element in the collection passes the `iterator` test,
 * otherwise `false`.
 * @example
 * var isPositive = function(x) { return x > 0; };
 * every([1, 2, 3], isPositive);
 * //=> true
 *
 * every([1, -1, 2], isPositive);
 * //=> false
 *
 * every([], identity);
 * //=> true
 */
let every = curry(function every(iterator, collection) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  var result = true;

  forEach(function(value, index, collection) {
    if (!iterator(value, index, collection)) {
      result = false;

      // Break iteration early
      return false;
    }
  }, collection);

  return result;
});

export default every;
