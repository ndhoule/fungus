import { isNumber } from './isNumber';

/**
 * Tests if a value is `NaN`.
 *
 * @name isNaN
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is `NaN`, otherwise `false`.
 * @example
 * isNaN(NaN);
 * //=> true
 *
 * isNaN(new Number(NaN));
 * //=> true
 *
 * isNaN(0);
 * //=> false
 *
 * isNaN('spam');
 * //=> false
 *
 * isNaN({});
 * //=> false
 */
export let isNaN = isNaN || function isNaN(val) {
  return isNumber(val) && val != +val;
};
