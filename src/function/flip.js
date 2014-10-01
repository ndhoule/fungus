import arity from './arity';
import isFunction from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Accepts a function and returns a new function that, when invoked, will call the original function
 * with its first and second arguments reversed.
 *
 * @name flip
 * @api public
 * @category Function
 * @param {*} fn The function to wrap.
 * @param {...Function} ...args Any other arguments to pass to the function.
 * @return {function(a, b, ...args)} Returns a new function that delegates to the original function.
 * Accepts at least two arguments, the order of which will be reversed when the original function is
 * invoked, as well as any (optional) additional arguments, which are passed without any changes to
 * ordering.
 * @example
 * var glueStrings = function() {
 *   return reduce(function(a, b) { return a + b; }, '', arguments);
 * };
 *
 * flip(glueStrings)('a', 'b');
 * //=> 'ba'
 *
 * // Subsequent arguments are not reordered
 * flip(glueStrings)('a', 'b', 'c', 'd', 'e');
 * //=> 'bacde'
 */
let flip = function flip(fn) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  return arity(fn.length, function(a, b, ...args) {
    return fn.call(this, b, a, ...args);
  });
};

export default flip;
