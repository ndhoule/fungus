import curry from './curry';
import isFunction from '../object/isFunction';
import lPartial from './lPartial';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * Wraps a function in a `wrapper` function, passing `func` as the first argument to `wrapper`, with
 * any additional arguments passed through to the `wrapper` function. This permits `wrapper` to
 * modify arguments, alter the results of `func`, or other modifying behaviors.
 *
 * @name wrap
 * @api public
 * @category Function
 * @see {@link lPartial}, {@link rPartial}
 * @param {Function} wrapper A wrapper function which will be invoked with `func` as its first
 * argument, as well as any additional arguments provided to the returned function.
 * @param {Function} func The function to wrap.
 * @return {Function} A new wrapper function.
 * @example
 * var greet = function(name) {
 *   return 'Hello, ' + name + '!';
 * };
 *
 * var greetPolitely = wrap(greet, function(func, name) {
 *   return func('Mr. or Ms. ' + name);
 * });
 *
 * greetPolitely('Nathan');
 * //=> 'Hello, Mr. or Ms. Nathan!'
 */
var wrap = curry(function wrap(wrapper, func) {
  if (!isFunction(wrapper) || !isFunction(func)) {
    throw NOT_FUNC_EXCEPTION;
  }

  return lPartial(wrapper, func);
});

export default wrap;
