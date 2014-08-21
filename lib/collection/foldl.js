import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from './forEach';
import { isFunction } from '../object/isFunction';

/**
 * TODO
 *
 * @name foldl
 * @api public
 * @category Collection
 * @param fn
 * @param collection
 * @param acc
 * @return {undefined}
 * @example
 *
 * var add = function(a, b) { return a + b; };
 *
 * foldl(add, [1, 2, 3], 0);
 * // => 6
 */
export let foldl = curry(function foldl(fn, collection, acc) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  forEach(function(val, i, collection) {
    acc = fn(acc, val, i, collection);
  }, collection);

  return acc;
});
