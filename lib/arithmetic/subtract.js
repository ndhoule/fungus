import { curry } from '../function/curry';

/**
 * Subtracts one number from another. Function version of the `-` operator.
 *
 * @name subtract
 * @api public
 * @category Arithmetic
 * @param {number} x The first term.
 * @param {number} y The second term.
 * @return {number} The result of `x - y`.
 * @example
 * subtract(3, 2);
 * //=> 1
 *
 * subtract(10, 20);
 * //=> -10
 */
export let subtract = curry(function subtract(x, y) {
  return x - y;
});
