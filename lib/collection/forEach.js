import curry from '../function/curry';
import isArray from '../object/isArray';
import keys from '../object/keys';

/**
 * Internal implementation of forEach. Works on arrays and array-like data
 * structures.
 *
 * @name arrayEach
 * @api private
 * @param {Function} iterator The function to execute per iteration.
 * @param {Array} array The array to iterate over.
 * @return {undefined}
 */
let arrayEach = function arrayEach(iterator, array) {
  let i = -1;
  let length = array.length;

  while (++i < length) {
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
let baseEach = function baseEach(iterator, object) {
  let ks = keys(object);
  let length = ks.length;
  let i = -1;

  while (++i < length) {
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
 * @name forEach
 * @api public
 * @alias each
 * @category Collection
 * @param {Function} iterator The function to invoke per iteration.
 * @param {Array|Object} collection The collection to iterate over.
 * @return {undefined} Because `forEach` is run only for side effects, always return `undefined`.
 * @example
 * forEach(function(letter, index, array) {
 *   console.log(letter, index, array);
 * }, ['a', 'b', 'c']);
 * //=> undefined
 * //-> "a" 0 ["a", "b", "c"]
 * //-> "b" 1 ["a", "b", "c"]
 * //-> "c" 2 ["a", "b", "c"]
 *
 * forEach(function(value, key, object) {
 *   console.log(value, key, object);
 * }, { name: 'Tim the Enchanter', food: 'spam' });
 * //=> undefined
 * //-> "Tim the Enchanter" "name" { name: "Tim the Enchanter", food: "spam" }
 * //-> "spam" "food" { name: "Tim the Enchanter", food: "spam" }
 */
// TODO: Check for `collection.length`, rather than testing if it's an array
// This could be `isArrayLike`
let forEach = curry(function forEach(iterator, collection) {
  return isArray(collection) ? arrayEach(iterator, collection) : baseEach(iterator, collection);
});

export default forEach;
