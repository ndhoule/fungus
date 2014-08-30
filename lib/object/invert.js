import { keys } from './keys';

/**
 * Takes an object and reverses all keys and values, where the old key becomes the new value, and
 * the old value becomes the new key.
 *
 * @name invert
 * @api public
 * @category Object
 * @param {Object} object The object to invert.
 * @return {Object} The inverted object.
 * @example
 * invert({ 'a': 'b' });
 * //=> { 'b': 'a' }
 */
export let invert = function invert(object) {
  let result = {};
  let ks = keys(object);
  let i = ks.length;

  while (--i >= 0) {
    result[object[ks[i]]] = ks[i];
  }

  return result;
};
