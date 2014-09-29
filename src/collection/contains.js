import curry from '../function/curry';
import eq from '../logic/eq';
import forEach from './forEach';
import is from '../object/is';
import isNaN from '../object/isNaN';

/**
 * Checks if a `target` value is present in a `collection`. Note that this implementation finds
 * `NaN` values and distinguishes between `0` and `-0`.
 *
 * @name contains
 * @api public
 * @category Collection
 * @see {@link indexOf}
 * @param {*} target The value to search `collection` for.
 * @param {Array|Object} collection The collection to search.
 * @return {boolean} Returns `true` if the value is present in the `collection`, `false` otherwise.
 * @example
 * contains(1, [1, 2, 3]);
 * //=> true
 *
 * contains(1, [2, 3, 4]);
 * //=> false
 *
 * var obj = {};
 * contains(obj, [1, 2, obj]);
 * //=> true
 *
 * contains(NaN, [0, NaN, 'a'])
 * //=> true
 */
let contains = curry(function contains(target, collection) {
  let comparator = target === 0 || isNaN(target) ? is : eq;
  let result = false;

  forEach(function(el) {
    if (comparator(target, el)) {
      result = true;
      // Element found, exit iteration early
      return false;
    }
  }, collection);

  return result;
});

export default contains;
