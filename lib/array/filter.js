import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { curry } from '../function/curry';
import { forEach } from '../collection/forEach';
import { isFunction } from '../object/isFunction';

/**
 * Accepts a testing function `iterator` and a list, and passes each element in the list in turn to
 * `iterator`. Returns an array containing only the elements in `list` for which `iterator` returned
 * a truthy value.
 *
 * @name filter
 * @api public
 * @category Array
 * @alias select
 * @see {@link reject}
 * @param {Function} iterator The test function. Receives `list[i], i, list` as its arguments.
 * @param {Array} list The list to filter.
 * @return {Array} A new array containing only the elements in `list` for which the predicate
 * function `iterator` returned a truthy value.
 * @example
 * var isEven = function(num) {
 *   return num % 2 === 0;
 * };
 *
 * filter(isEven, [1, 2, 3, 4, 5]);
 * //=> [2, 4]
 */
export let filter = curry(function filter(iterator, list) {
  // TODO: Can we fanagle this to throw an error before all curried arguments
  // are received? Probably too messy.
  if (!isFunction(iterator)) {
    throw NOT_FUNC_EXCEPTION;
  }

  let result = [];

  forEach(function(elem, i, list) {
    if (iterator(elem, i, list)) {
      result.push(elem);
    }
  }, list);

  return result;
});
