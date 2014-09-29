import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import curry from '../function/curry';
import forEach from './forEach';
import isFunction from '../object/isFunction';

/**
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from right to left, repeatedly calling an `iterator` function and passing to it four
 * arguments: `(accumulator, value, index, collection)`.
 *
 * Returns the final return value of the `iterator` function.
 *
 * @name foldl
 * @api public
 * @category Collection
 * @alias reduce, reduceLeft
 * @see {@link foldr}
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @param {*} acc The initial accumulator value, passed to the first invocation of `iterator`.
 * @return {*} The return value of the final call to `iterator`.
 * @example
 * foldl(function(total, n) {
 *   return total + n;
 * }, 0, [1, 2, 3]);
 * //=> 6
 *
 * var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };
 *
 * foldl(function(results, phoneNumber) {
 *  if (phoneNumber[0] === '6') {
 *    return results.concat(phoneNumber);
 *  }
 *  return results;
 * }, [], phonebook);
 * // => ['655-222-6789', '655-333-1298']
 */
let foldl = curry(function foldl(iterator, acc, collection) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  forEach(function(val, i, collection) {
    acc = iterator(acc, val, i, collection);
  }, collection);

  return acc;
});

export default foldl;
