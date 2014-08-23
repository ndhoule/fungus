import { arrayClass } from '../internal/classes';

// XXX: Move to a utility file
let toString = Object.prototype.toString;

let nativeIsArray = Array.isArray;

/**
 * Tests if a value is an array.
 *
 * @name isArray
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is an array, otherwise `false`.
 * @example
 * isArray({});
 * //=> false
 *
 * isArray(1);
 * //=> false
 *
 * // Checks if something an array--doesn't simply test length
 * var obj = {};
 * obj.length = 1;
 * isArray(obj);
 * //=> false
 *
 * isArray([]);
 * //=> true
 */
export let isArray = nativeIsArray || function(val) {
  return typeof val === 'object' && toString.call(val) === arrayClass;
};
