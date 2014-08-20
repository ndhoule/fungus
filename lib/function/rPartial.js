import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { isFunction } from '../object/isFunction';

/**
 * TODO
 *
 * @param {Function} fn The function to partially apply arguments to.
 * @param {...*} ...partialArgs Arguments to partially apply to `fn`.
 * @return {undefined} A new function that, when called, will invoke `fn`,
 * passing it any arguments passed to the wrapper function, followed by any
 * partially applied arguments.
 */
export let rPartial = function rPartial(fn, ...partialArgs) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  if (!partialArgs.length) {
    return fn;
  }

  return arity(fn.length - partialArgs.length, function(...args) {
    return fn.apply(this, args.concat(partialArgs));
  });
};
