import curry from '../function/curry';

/**
 * Right-associative version of [`foldl`](#foldl).
 *
 * Reduces all the values in a collection down into a single value. Does so by iterating through the
 * collection from right to left, repeatedly calling an `iterator` function and passing to it four
 * arguments: `(accumulator, value, index, collection)`.
 *
 * Returns the final return value of the `iterator` function.
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
 * foldr(function(result, val) {
 *   return result + val;
 * }, 'z', ['a', 'b', 'c', 'd']);
 * //=> 'zdcba'
 */
let foldr = curry(function foldr(iterator, acc, collection) {});

export default foldr;
