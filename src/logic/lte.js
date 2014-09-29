import curry from '../function/curry';

/**
 * Determines whether or not one value is less than or equal to another. Function version of
 * the `<=` operator.
 *
 * @name gte
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {boolean} The result of `x <= y`.
 * @example
 * lte(2, 2);
 * //=> true
 *
 * lte(-100, 4);
 * //=> true
 *
 * lte(2, 1);
 * //=> false
 */
let lte = curry(function lte(x, y) {
  return x <= y;
});

export default lte;
