import { arrayClass } from '../internal/classes';

// XXX: Move to a utility file
let toString = Object.prototype.toString;

let nativeIsArray = Array.isArray;

/**
 * Tests if a value is an array.
 *
 * @param {*} val The value to test.
 * @return {undefined} Returns `true` if `val` is an array, otherwise `false`.
 */
export let isArray = nativeIsArray || function(val) {
  return typeof val === 'object' && toString.call(val) === arrayClass;
};
