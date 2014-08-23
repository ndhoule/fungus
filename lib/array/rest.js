import { _slice } from '../internal/slice';
import { existy } from '../utility/existy';

/**
 * Returns a new array containing all but the first element from the input list.
 *
 * @name rest
 * @api public
 * @see {@link first}, {@link take}, {@link drop}
 * @category Array
 * @param {Array} list The list to retrieve values from.
 * @return {Array} An array containing all but the first element from the list. Returns an empty
 * array if the `list` does not contain more than one element.
 * @example
 * rest([1, 2, 3]);
 * //=> [2, 3]
 *
 * rest([]);
 * //=> []
 *
 * // `rest` is especially useful on `arguments`
 * var partial = function(fn) {
 *   var args = rest(arguments);
 *
 *   return function() {
 *     var newArgs = Array.prototype.slice.call(arguments);
 *     return fn.apply(this, newArgs.concat(args);
 *   };
 * };
 */
export let rest = function rest(list) {
  // TODO: Check for array-like and throw(?) if passed something that is not

  return _slice(list, 1);
};
