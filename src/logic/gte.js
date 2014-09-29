import curry from '../function/curry';

/**
 * Determines whether or not one value is greater than or equal to another. Function version of
 * the `>=` operator.
 *
 * @name gte
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {boolean} The result of `x >= y`.
 * @example
 * gte(2, 1);
 * //=> true
 *
 * gte(2, 2);
 * //=> true
 *
 * gte(-100, 4);
 * //=> false
 */
let gte = curry(function gte(x, y) {
  return x >= y;
});

export default gte;
