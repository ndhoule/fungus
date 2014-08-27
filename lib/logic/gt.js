import { curry } from '../function/curry';

/**
 * Determines whether or not one value is greater than another. Function version of the `>`
 * operator.
 *
 * @name gt
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {boolean} The result of `x > y`.
 * @example
 * gt(2, 1);
 * //=> true
 *
 * gt(-100, 4);
 * //=> false
 */
export let gt = curry(function gt(x, y) {
  return x > y;
});
