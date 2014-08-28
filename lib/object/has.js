import { curry } from '../function/curry';
import { existy } from '../utility/existy';

let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Checks an `object` for a specified property, ignoring inherited properties.
 *
 * @name has
 * @api public
 * @category Object
 * @param {string} key The key to search `object` for.
 * @param {Object} object The object to search.
 * @return {boolean} Returns `true` if `object` has a direct property at the given key, otherwise
 * `false`.
 * @example
 * has(food, { food: 'spam' });
 * //=> true
 *
 * var parent = { a: 'a' };
 * var child = Object.create(parent);
 *
 * // Ignores inherited properties
 * has('a', child);
 * //=> false
 */
export let has = curry(function has(key, object) {
  return existy(object) && hasOwnProperty.call(object, key);
});
