import arity from './arity';
import isFunction from '../object/isFunction';
import { NO_ARGS_EXCEPTION, NOT_FUNC_EXCEPTION } from '../internal/exceptions';

let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Serializes an array of values. Used a a serializer in `memoize` and works on
 * complex data types (objects, arrays, etc.).
 *
 * @name defaultSerialize
 * @api private
 * @param {Array} args The values to serialize.
 * @return {string} A serialized, string representation version of the input `args`.
 * @example
 * TODO
 */
let defaultSerialize = (function defaultSerialize() {
  const PREFIX = '_cache_';

  return function(args) {
    return PREFIX + JSON.stringify(args);
  };
}());

/**
 * Memoizes the provided function by caching any computed results. Results are cached against the
 * `arguments` list; if the returned function is called twice with the same arguments list, the
 * result will only be computed once.
 *
 * Works on complex data types (objects, arrays, etc.) with a few caveats:
 * - Does not do any identity testing. This means that if two objects with identical properties are
 *   passed in, the memoized value will be returned as the result of the the second function call.
 * - If any non-primitive arguments have been changed since the last function
 *   invocation, the result will be recomputed
 *
 * Optionally, a serializer function can also be provided. The serializer function has a signature
 * of `(args)`, where `args` is an array of arguments provided to the memoized function when
 * invoked. By default, the cache is an object, where the key for a function invocation is
 * `'_cache_' + JSON.stringify(arguments)`.
 *
 * @name memoize
 * @api public
 * @category Function
 * @param {Function} fn The function to memoize.
 * @param {Function} [serializer] A function used to serialize arguments to the
 * memoized function into storage.
 * @return {Function} A memoized version of `fn`.
 * @example
 * var memoAdd = memoize(function add(a, b) {
 *   return a + b;
 * });
 *
 * // Computes and caches the results
 * memoAdd(1, 2);
 * //=> 3
 *
 * // Pulls from cache rather than calling `add` again
 * memoAdd(1, 2);
 * //=> 3
 *
 * // Computes and caches the results
 * memoAdd(1, 4);
 * //=> 3
 */
let memoize = function memoize(fn, serialize = defaultSerialize) {
  if (!arguments.length) {
    throw NO_ARGS_EXCEPTION;
  }

  if (!isFunction(fn) || !isFunction(serialize)) {
    throw NOT_FUNC_EXCEPTION;
  }

  // XXX: Potentially replace this with a `Map` so we can test identity of arguments
  let cache = Object.create(null);

  // TODO: If `fn` was curried, we should curry this returned function, too.
  // We don't currenty have a good way of checking for curried-ness.
  return arity(fn.length, function(...args) {
    let serialized = serialize(args);

    return serialized in cache ? cache[serialized] : cache[serialized] = fn.apply(this, args);
  });
};

export default memoize;
