import { isObject } from './isObject';

let hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 * More permissive than the native `Object.keys` function (non-objects will not throw errors).
 *
 * @name keys
 * @api public
 * @category Object
 * @param {Object} target The value to retrieve keys from.
 * @return {Array} An array containing all the input `target`'s keys.
 * @example
 * keys({ likes: 'avocado', hates: 'pineapple' });
 * //=> ['likes', 'pineapple'];
 *
 * // Ignores non-enumerable properties
 * var hasHiddenKey = { name: 'Tim' };
 * Object.defineProperty(hasHiddenKey, 'hidden', {
 *   value: 'i am not enumerable!',
 *   enumerable: false
 * })
 * keys(hasHiddenKey);
 * //=> ['name'];
 *
 * // Works on arrays
 * keys(['a', 'b', 'c']);
 * //=> ['0', '1', '2']
 *
 * // Skips unpopulated indices in sparse arrays
 * var arr = [1];
 * arr[4] = 4;
 * keys(arr);
 * //=> ['0', '4']
 */
export let keys = function keys(target) {
  if (!isObject(target)) {
    return [];
  }

  if (Object.keys) {
    return Object.keys(target);
  }

  let results = [];

  for (let key in target) {
    if (hasOwnProperty.call(target, key)) {
      results.push(key);
    }
  }

  return results;
};
