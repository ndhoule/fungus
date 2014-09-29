import curry from '../function/curry';

/**
 * Multiplies one number by another. Function version of the `+` operator.
 *
 * @name multiply
 * @api public
 * @category Arithmetic
 * @param {number} x The first term.
 * @param {number} y The second term.
 * @return {number} The product. The result of `x * y`;
 * @example
 * multiply(1, 2);
 * //=> 2
 *
 * multiply(8, 9);
 * //=> 72
 */
let multiply = curry(function multiply(x, y) {
  return x * y;
});

export default multiply;
