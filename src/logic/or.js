import curry from '../function/curry';

/**
 * Evaluates the left-hand expression and returns the left-hand expression if it is truthy;
 * otherwise, evaluates and returns the right-hand expression. Function version of the `||`
 * operator.
 *
 * @name or
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {*} The result of `x || y`.
 * @example
 * or(false, true);
 * //=> true
 *
 * or(0, 1);
 * //=> 1
 *
 * or({}, []);
 * //=> {}
 *
 * or('omg', true);
 * //=> 'omg'
 */
var or = curry(function or(x, y) {
  return x || y;
});

export default or;
