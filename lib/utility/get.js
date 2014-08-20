import { curry } from '../function/curry';
import { existy } from '../utility/existy';

/**
 * Retrieves the value at `key` on `target`; i.e. `get('a', { a: 1 }) => 1`. A
 * functional replacement for the `.` operator.
 *
 * @param {string} key The key to use.
 * @param {Object} target The target object to search.
 * @return {*|undefined} The value located at `key` on `target`, or `undefined`
 * if not found.
 */
export let get = curry(function get(key, target) {
  return existy(target) ? target[key] : undefined;
});
