import curry from '../function/curry';
import eq from '../logic/eq';
import is from '../object/is';
import isNaN from '../object/isNaN';

/**
 * Returns the first index at which a `value` can be found in a `array`, or -1 if the `value` is not
 * found.
 *
 * Unlike the native `indexOf` method, this implementation finds `NaN` values and distinguishes
 * between `0` and `-0`.
 *
 * @name indexOf
 * @api public
 * @category Array
 * @see {@link lastIndexOf}
 * @param {*} value The value to search the `array` for.
 * @param {Array} array The array to search.
 * @return {number} The first index of the `value` in the `array`, or -1 if `value` was not
 * found.
 * @example
 * indexOf(8, [4, 8, 12]);
 * //=> 1
 *
 * indexOf('a', 'abc');
 * //=> 0
 *
 * indexOf(NaN, [1, 2, NaN, 4]);
 * //=> 2
 *
 * indexOf(-0, [0, 1, 2]);
 * //=> -1
 */
var indexOf = curry(function indexOf(target, array) {
  var comparator = target === 0 || isNaN(target) ? is : eq;
  var result = -1;
  var i = -1;

  while (++i < array.length) {
    if (comparator(array[i], target)) {
      // Cast index to number--`arguments` indices are represented as strings
      result = +i;
      break;
    }
  }

  return result;
});

export default indexOf;
