import { arrayClass } from '../internal/classes';

let toString = Object.prototype.toString;

/**
 * Tests if a value is an array.
 *
 * @name isArray
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is an array, otherwise `false`.
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
export let isArray = Array.isArray || function(val) {
  return toString.call(val) === arrayClass;
};
