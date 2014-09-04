import { booleanClass } from '../internal/classes';

var toString = Object.prototype.toString;

/**
 * Tests if a value is a boolean.
 *
 * @name isBoolean
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a boolean, otherwise `false`.
 * @example
 * isBoolean(true);
 * //=> true
 *
 * isBoolean(false);
 * //=> true
 *
 * isBoolean(new Boolean(true));
 * //=> true
 *
 * isBoolean(0);
 * //=> false
 *
 * isBoolean(1);
 * //=> false
 *
 * isBoolean(null);
 * //=> false
 *
 * isBoolean([true]);
 * //=> false
 */
var isBoolean = function isBoolean(val) {
 return val === true || val === false || toString.call(val) === booleanClass;
};

export default isBoolean;
