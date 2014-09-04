import curry from '../function/curry';

/**
 * Returns the modulo of two numbers. Modulo is defined as the amount by which a given dividend
 * exceeds the greatest multiple of the divisor (but is not greater than the divisor).
 *
 * Note that this is not analogous to JavaScript's `%` operator (which is actually a remainder
 * operation). If you're looking for that operator, see [`remainder`](#remainder).
 *
 * For more details on the difference between modulus and remainder, see
 * [this link](http://www.mintoris.com/basic14216.html).
 *
 * @name modulo
 * @api public
 * @category Arithmetic
 * @alias mod
 * @see {@link remainder}
 * @param {number} x The dividend.
 * @param {number} y The divisor.
 * @return {number} The amount by which the `dividend` exceeds the greatest multiple of the
 * `divisor`.
 * @example
 * modulo(10, 6)
 * //=> 4
 *
 * modulo(-4, 3)
 * //=> 2
 *
 * modulo(-10, 7)
 * //=> 4
 */
var modulo = curry(function modulo(x, y) {
  var rem = x % y;

  return rem === 0 || x * y > 0 ? rem : rem + y;
});

export default modulo;
