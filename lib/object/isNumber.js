import { numberClass } from '../internal/classes';
import { toString } from '../internal/utilities';

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
let isNumber = function isNumber(val) {
  let type = typeof val;

  return type === 'number' || (type === 'object' && toString(val) === numberClass);
};

export default isNumber;
