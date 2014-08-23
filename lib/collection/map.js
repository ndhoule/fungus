import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from './forEach';
import { isFunction } from '../object/isFunction';

/**
 * Produce a new array by passing each value in the input `list` through a transformative `iterator`
 * function. The `iterator` function is passed three arguments: `(value, index, list)`.
 *
 * @name map
 * @api public
 * @category Collection
 * @alias collect
 * @param {Function} iterator The transformer function to invoke per iteration.
 * @param {Array} list The list to iterate over.
 * @return {Array} A new array containing the results of each `iterator` invocation.
 */
export let map = curry(function map(iterator, list) {
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  var result = [];

  forEach(function(val, i, list) {
    result.push(iterator(val, i, list));
  }, list);

  return result;
});
