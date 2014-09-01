import { stringClass } from '../internal/classes';

let toString = Object.prototype.toString;

/**
 * Tests if a value is a string.
 *
 * @name isString
 * @api public
 * @category Object
 * @param {val} string The value to test
 * @return {boolean} Returns `true` if the value is a string, and `false` otherwise.
 * @example
 * isString('');
 * //=> true
 *
 * isString('test');
 * //=> true
 *
 * isString(new String());
 * //=> true
 *
 * isString(new String('test'));
 * //=> true
 *
 * isString(123);
 * //=> false
 *
 * isString(null);
 * //=> false
 *
 * isString({ length: 1 });
 * //=> false
 */
let isString = function isString(val) {
   return typeof val === 'string' || toString.call(val) === stringClass;
};

export default isString;
