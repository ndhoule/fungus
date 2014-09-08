import { numberClass } from '../internal/classes';

/**
 * Tests if a value is a number.
 *
 * @name isNumber
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a number, otherwise `false`.
 * @example
 * isNumber(true);
 * //=> false
 *
 * isNumber('spam');
 * //=> false
 *
 * isNumber(0);
 * //=> true
 *
 * isNumber(100);
 * //=> true
 *
 * isNumber(NaN);
 * //=> true
 *
 * isNumber(Infinity);
 * //=> true
 */
var isNumber = function isNumber(val) {
  var type = typeof val;

  return type === 'number' ||
    (type === 'object' && Object.prototype.toString.call(val) === numberClass);
};

export default isNumber;
