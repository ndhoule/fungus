import arity from '../function/arity';
import isFunction from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Returns a function that wraps `fn`, returning its logical opposite when invoked.
 *
 * @name not
 * @api public
 * @category Utility
 * @param {Function} fn The function to wrap.
 * @return {boolean} The result of calling `fn` and then negating its return value.
 * @example
 * var alwaysTrue = function() { return true; };
 * var alwaysFalse = not(alwaysTrue);
 *
 * alwaysFalse();
 * //=> false
 */
let not = function not(fn) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  return arity(fn.length, function() {
    return !fn.apply(this, arguments);
  });
};

export default not;
