import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from './forEach';
import { isFunction } from '../object/isFunction';

/**
 * TODO
 *
 * @name map
 * @api public
 * @category Collection
 * @param {Function} fn TODO
 * @param {Array} list TODO
 * @return {Array} TODO
 */
export let map = curry(function map(fn, list) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  var result = [];

  forEach(function(val, i, list) {
    result.push(fn(val, i, list));
  }, list);

  return result;
});
