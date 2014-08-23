import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { isFunction } from '../object/isFunction';

/**
 *
 *
 * [Partially apply](https://en.wikipedia.org/wiki/Partial_application) a function `fn`, returning a
 * new function that pre-fills some of `fn`'s arguments. Like [lPartial](#lPartial), but partially
 * applied arguments are appended to the arguments provided to the new function.
 *
 * @name rPartial
 * @api public
 * @alias partialRight
 * @see {@link lPartial}
 * @category Function
 * @param {Function} fn The function to partially apply arguments to.
 * @param {...*} partialArgs Arguments to partially apply to `fn`.
 * @return {undefined} A new function that, when called, will invoke `fn`, passing it any arguments
 * provided to the wrapper function followed by the partially applied arguments.
 * @example
 * var isDivisibleBy = function(a, b) { return a % b === 0; };
 * var isEven = rPartial(isDivisibleBy, 2);
 * isEven(2);
 * //=> true
 * isEven(5);
 * //=> false
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
