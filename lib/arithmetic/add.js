import curry from '../function/curry';

/**
 * Adds two numbers together. Function version of the `+` operator.
 *
 * @name add
 * @api public
 * @category Arithmetic
 * @param {number} x The first term.
 * @param {number} y The second term.
 * @return {number} The result of `x + y`.
 * @example
 * add(1, 2);
 * //=> 3
 *
 * add(-2, 1);
 * //=> -1
 */
var add = curry(function add(x, y) {
  return x + y;
});

export default add;
