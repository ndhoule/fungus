import curry from '../function/curry';
import isNumber from '../object/isNumber';

/**
 * Creates an array of numbers, starting and including `start`, up to but excluding `end`. If
 * `start` is less than or equal to `end`, an empty array is returned.
 *
 * @name range
 * @api public
 * @category Array
 * @param {number} start The lower limit of the range, inclusive.
 * @param {number} end The upper limit of the range, exclusive.
 * @return {Array} The range of numbers.
 * @example
 * range(1, 10);
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]

 * range(1, 1);
 * //=> []
 *
 * range(10, -10);
 * //=> []
 */
let range = curry(function range(start, end) {
  if (!isNumber(start)) { start = 0; }
  if (!isNumber(end)) { end = 0; }

  let length = Math.max(end - start, 0);
  let array = new Array(length);
  let i = -1;

  while (++i < length) {
    array[i] = start + i;
  }

  return array;
});

export default range;
