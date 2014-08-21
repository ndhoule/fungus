import { arity } from './arity';
import { isNumber } from '../object/isNumber';
import { isFunction } from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * TODO
 *
 * @name wrapCurry
 * @api private
 * @param fn
 * @param remainingArity
 * @param previousArgs
 * @return {undefined}
 */
let wrapCurry = function wrapCurry(fn, remainingArity, previousArgs) {
  return arity(remainingArity, function(...newArgs) {
    let newArity = remainingArity - newArgs.length;
    let args = previousArgs.concat(newArgs);

    if (newArity > 0) {
      return wrapCurry(fn, newArity, args);
    }

    return fn.apply(this, args);
  });
};

/**
 * Accepts a function `fn` and returns a new function that, when invoked, will
 * repeatedly return a new wrapper function until all expected arguments have
 * been provided.
 *
 * @name curry
 * @api public
 * @category Function
 * @param {Function} fn The function to wrap.
 * @param {number} [fnArity=fn.length] The optional desired arity of the return
 * function. When not provided, defaults to the arity of the provided `fn`.
 * @return {Function} A curried function that delegates to the provided `fn`.
 */
export let curry = function curry(fn, fnArity) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  fnArity = isNumber(fnArity) ? fnArity : fn.length;

  return wrapCurry(fn, fnArity, []);
};
