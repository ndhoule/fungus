/**
 * Negates the number provided. Function version of the `-` operator applied to an expression.
 *
 * @name negate
 * @api public
 * @category Arithmetic
 * @param {number} num The number to negate.
 * @return {number} The negated `num`.
 * @example
 * negate(1);
 * //=> -1
 *
 * negate(-11);
 * //=> 1
 */
var negate = function(num) {
  return -num;
};

export default negate;
