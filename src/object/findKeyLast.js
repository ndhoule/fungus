import curry from '../function/curry';
import forOwnRight from './forOwnRight';

/**
 * Iterates through an `object`'s own enumerable properties, invoking a predicate function for each
 * value and returning the last key for which the predicate function returns a truthy value. The
 * predicate function is invoked with three arguments: `value`, `key`, and `object`.
 *
 * Note that enumeration order is not guaranteed to be consistent across platforms.
 *
 * @name findKeyLast
 * @api public
 * @category Object
 * @see {@link findKey}
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
 * //=> 'd' (enumeration order not guaranteed to be consistent across platforms)
 */
var findKeyLast = curry(function findKeyLast(predicate, object) {
  var result;

  forOwnRight(function(element, key, object) {
    if (predicate(element, key, object)) {
      result = key;
      return false;
    }
  }, object);

  return result;
});

export default findKeyLast;
