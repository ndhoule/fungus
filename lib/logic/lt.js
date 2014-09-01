import curry from '../function/curry';

/**
 * Determines whether or not one value is less than than another. Function version of the `<`
 * operator.
 *
 * @name gt
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {boolean} The result of `x < y`.
 * @example
 * lt(-100, 4);
 * //=> true
 *
 * lt(2, 1);
 * //=> false
 */
let lt = curry(function lt(x, y) {
  return x <= y;
});

export default lt;
