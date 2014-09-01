import curry from '../function/curry';

/**
 * Divides one number by another. Function version of the `/` operator.
 *
 * @name divide
 * @api public
 * @category Arithmetic
 * @param {number} x The dividend.
 * @param {number} y The the divisor.
 * @return {number} The result of `x / y`.
 * @example
 * divide(10, 5);
 * //=> 2
 *
 * divide(1, 2);
 * //=> 0.5
 */
let divide = curry(function divide(x, y) {
  return x / y;
});

export default divide;
