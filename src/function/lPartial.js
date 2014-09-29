import arity from '../function/arity';
import isFunction from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * [Partially apply](https://en.wikipedia.org/wiki/Partial_application) a function `fn`, returning a
 * new function that pre-fills some of `fn`'s arguments. Passes to `fn` the partially applied
 * arguments, followed by any new arguments.
 *
 * @name lPartial
 * @api public
 * @category Function
 * @alias partialLeft
 * @see {@link rPartial}
 * @param {Function} fn The function to partially apply arguments to.
 * @param {...*} partialArgs Arguments to partially apply to `fn`.
 * @return {undefined} A new function that, when called, will invoke `fn`, passing it the partially
 * applied arguments first, followed any other arguments passed to the wrapper function.
 * @example
 * var add = function(a, b) { return a + b; };
 * var addFive = lPartial(add, 5);
 * addFive(10);
 * //=> 15
 */
let lPartial = function lPartial(fn, ...partialArgs) {
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

export default lPartial;
