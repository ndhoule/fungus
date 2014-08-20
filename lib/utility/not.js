import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { isFunction } from '../object/isFunction';

/**
 * Returns a function that wraps `fn`, returning its logical opposite when
 * invoked.
 *
 * @param {Function} fn The function to wrap.
 * @return {boolean} The result of calling `fn` and then negating its return
 * value.
 */
export let not = function not(fn) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  return arity(fn.length, function() {
    return !fn.apply(this, arguments);
  });
};
