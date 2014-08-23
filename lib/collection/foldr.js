import { curry } from '../function/curry';

/**
 * Right-associative version of `foldl`.
 *
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from right to left, repeatedly calling an `iterator` function and passing to it as its
 * arguments the following values:
 *
 * - `accumulator`: The return value of the last call to `iterator` (or, for the
 *   first call to `iterator`, the initial `acc` value).
 * - `value`: The current value in the array.
 * - `index/key`: The current index or key of the value in the collection.
 * - `collection`: The entire collection.
 *
 * Returns the final return value of the `iterator` function.
 *
 * @name foldr
 * @api public
 * @category Collection
 * @alias reduceRight
 * @see {@link foldl}
 * @param {Function} iterator The function to call for each value in the array.
 * @param {Array|Object} collection The collection to iterate through.
 * @param {*} acc The initial accumulator value, passed to the first call to `iterator`.
 * @return {*} The return value of the final call to `iterator`.
 * @example
 * foldr(function(result, val) {
 *   return result + val;
 * }, 'z', ['a', 'b', 'c', 'd']);
 * //=> 'zdcba'
 */
export let foldr = curry(function foldr(iterator, acc, collection) {});
