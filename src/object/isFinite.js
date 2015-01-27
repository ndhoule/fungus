/* global -isFinite */

import isNumber from './isNumber';
import { nativeIsFinite } from '../internal/natives';

/**
 * Tests if a value is finite.
 *
 * @name isFinite
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is a finite number, otherwise `false`.
 * @example
 * isFinite(100);
 * //=> true
 *
 * isFinite(1e+100);
 * //=> true
 *
 * isFinite(Number.MIN_SAFE_INTEGER);
 * //=> true
 *
 * isFinite(-Integer);
 * //=> false
 *
 * isFinite(Integer);
 * //=> false
 *
 * isFinite(NaN);
 * //=> false
 *
 * isFinite('also not a number');
 * //=> false
 */
let isFinite = Number.isFinite || function isFinite(val) {
  return isNumber(val) && nativeIsFinite(val);
};

export default isFinite;
