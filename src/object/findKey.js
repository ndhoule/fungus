import curry from '../function/curry';
import forOwn from './forOwn';

/**
 * Iterates through an `object`'s own enumerable properties, invoking a predicate function for each
 * value, and returns the first key for which the predicate function returns a truthy value. The
 * predicate function is invoked with three arguments: `value`, `key`, and `object`.
 *
 * Note that enumeration order is not guaranteed to be consistent across platforms.
 *
 * @name findKey
 * @api public
 * @category Object
 * @see {@link findKeyLast}
 * @param {Function} predicate A predicate function called per iteration.
 * @param {Object} object The object to iterate over.
 * @return {string|undefined} The key of the found element, else `undefined`.
 * @example
 * var animals = { a: 'aardvark', b: 'bear', c: 'cat', d: 'dingo' };
 *
 * var isRabbit = function(animal) {
 *   return animal === 'rabbit';
 * };
 * findKey(isRabbit, animals);
 * //=> undefined
 *
 * var isCatOrDingo = function(animal) {
 *   return animal === 'cat' || animal === 'dingo';
 * };
 * findKey(isCatOrDingo, animals);
 * //=> 'c' (enumeration order not guaranteed to be consistent across platforms)
 */
var findKey = curry(function findKey(predicate, object) {
  var result;

  forOwn(function(element, key, object) {
    if (predicate(element, key, object)) {
      result = key;
      return false;
    }
  }, object);

  return result;
});

export default findKey;
