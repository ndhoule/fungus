import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from './forEach';
import { isFunction } from '../object/isFunction';

/**
 * TODO
 *
 * @param fn
 * @param collection
 * @param acc
 * @return {undefined}
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
