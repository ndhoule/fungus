import { curry } from '../function/curry';

/**
 * Evaluates the left-hand expression and returns the left-hand expression if it is falsy;
 * otherwise, evaluates and returns the right-hand expression. Function version of the `&&`
 * operator.
 *
 * @name and
 * @api public
 * @category Logic
 * @param {*} x The first term.
 * @param {*} y The second term.
 * @return {*} The result of `x && y`.
 * @example
 * and(false, true);
 * //=> false
 *
 * and(0, 1);
 * //=> 0
 *
 * and({}, []);
 * //=> []
 *
 * and('omg', true);
 * //=> true
 */
export let and = curry(function and(x, y) {
  return x && y;
});
