import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from '../collection/forEach';
import { isFunction } from '../object/isFunction';

/**
 * Accepts a testing function `fn` and a list, and passes each element in the
 * list in turn to `fn`. Returns an array containing only the elements in `list`
 * for which `fn` returned a truthy value.
 *
 * @param {Function} fn The test function. Receives `list[i], i, list` as its
 * arguments.
 * @param {Array} list The list to filter.
 * @return {Array} A new array containing only the elements in `list` for which
 * the predicate function `fn` returned a truthy value.
 */
export let filter = curry(function filter(fn, list) {
  // TODO: Can we fanagle this to throw an error before all curried arguments
  // are received? Probably too messy.
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  let result = [];

  forEach(function(elem, i, list) {
    if (fn(elem, i, list)) {
      result.push(elem);
    }
  }, list);

  return result;
});
