/**
 * Creates an array composed of all keys on the input object. Ignores any non-enumerable properties.
 *
 * @name keys
 * @api public
 * @category Object
 * @param {Object} val
 * @return {Array} An array containing all the input `val`'s keys.
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
 */
// TODO: Provide non-Object.keys implementation
export let keys = Object.keys;
