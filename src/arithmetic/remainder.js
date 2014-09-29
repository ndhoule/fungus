import curry from '../function/curry';

/**
 * Returns the integer remainder of dividing one number by another. Function version of the `%`
 * operator which, despite its pronunciation as the "modulo" operator, actually implements a
 * remainder operation.
 *
 * For more details on the difference between modulus and remainder, see
 * [this link](http://www.mintoris.com/basic14216.html).
 *
 * @name remainder
 * @api public
 * @category Arithmetic
 * @alias rem
 * @see {@link modulo}
 * @param {number} x The dividend.
 * @param {number} y The divisor.
 * @return {number} The remainder of dividing `dividend` by `divisor`.
 * @example
 * remainder(8, 3);
 * //=> 2
 *
 * remainder(10, 5);
 * //=> 0
 *
 * remainder(-10, 3);
 * //=> -1
 */
let remainder = curry(function remainder(x, y) {
  return x % y;
});

export default remainder;
