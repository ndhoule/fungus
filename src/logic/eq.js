import curry from '../function/curry';

/**
 * Determines whether or not one value is strictly equal to another. Function version of the `===`
 * operator.
 *
 * @name eq
 * @api public
 * @category Logic
 * @alias equals
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {boolean} The result of `x === y`.
 * @example
 * eq(1, 1);
 * //=> true
 *
 * eq(2, 1);
 * //=> false
 *
 * eq({}, {});
 * //=> false
 *
 * var obj = {};
 * eq(obj, obj);
 * //=> true
 */
let eq = curry(function eq(x, y) {
  return x === y;
});

export default eq;
