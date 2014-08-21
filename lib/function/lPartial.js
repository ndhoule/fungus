import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { isFunction } from '../object/isFunction';

/**
 * TODO
 *
 * @name lPartial
 * @api public
 * @category Function
 * @param {Function} fn The function to partially apply arguments to.
 * @param {...*} ...partialArgs Arguments to partially apply to `fn`.
 * @return {undefined} A new function that, when called, will invoke `fn`,
 * passing it the partially applied arguments first, then any other arguments
 * passed to the wrapper function.
 */
export let lPartial = function lPartial(fn, ...partialArgs) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  if (!partialArgs.length) {
    return fn;
  }

  return arity(fn.length - partialArgs.length, function(...args) {
    return fn.apply(this, partialArgs.concat(args));
  });
};
