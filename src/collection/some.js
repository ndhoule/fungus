import curry from '../function/curry';
import every from './every';
import isFunction from '../object/isFunction';
import not from '../utility/not';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Accepts a test function and a `collection`, and returns `true` if the test returns a truthy value
 * for any element in the `collection`. Otherwise, returns `false`.
 *
 * @name every
 * @api public
 * @category Collection
 * @alias any
 * @see {@link every}
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {boolean} Returns `true` if any element in the collection passes the `iterator` test,
 * otherwise `false`.
 * @example
 * var isEven = function(x) { return x % 2 === 0; };
 * some([1, 2, 3], isEven);
 * //=> true
 *
 * some([1, 1, 3], isEven);
 * //=> false
 *
 * some([], identity);
 * //=> false
 */
let some = curry(function some(iterator, collection) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  return !every(not(iterator), collection);
});

export default some;
