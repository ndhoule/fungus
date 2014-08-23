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
 */
export let rest = function rest(list) {
  // TODO: Check for array-like and throw(?) if passed something that is not

  return _slice(list, 1);
};
