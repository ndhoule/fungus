import curry from '../function/curry';
import forEachRight from './forEachRight';
import isFunction from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from right to left, repeatedly calling an `iterator` function and passing to it four
 * arguments: `(accumulator, value, index, collection)`.
 *
 * @name foldr
 * @api public
 * @category Collection
 * @alias reduceRight
 * @see {@link foldl}
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @param {*} acc The initial accumulator value, passed to the first invocation of `iterator`.
 * @return {*} The return value of the final call to `iterator`.
 * @example
 * foldr(function(total, n) {
 *   return total + n;
 * }, 'z', ['a', 'b', 'c']);
 * //=> 'zcba'
 *
 * var phonebook = { bob: '555-111-2345', tim: '655-222-6789', sheila: '655-333-1298' };
 *
 * foldr(function(results, phoneNumber) {
 *  if (phoneNumber[0] === '6') {
 *    return results.concat(phoneNumber);
 *  }
 *  return results;
 * }, [], phonebook);
 * // => ['655-333-1298', '655-222-6789']
 */
let foldr = curry(function foldr(iterator, acc, collection) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  forEachRight(function(val, i, collection) {
    acc = iterator(acc, val, i, collection);
  }, collection);

  return acc;
});

export default foldr;
