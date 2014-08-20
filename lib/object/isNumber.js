import { numberClass } from '../internal/classes';
import { toString } from '../internal/utilities';

/**
 * Tests if a value is a number.
 *
 * @param {*} val The value to test.
 * @return {undefined} Returns `true` if `val` is a number, otherwise `false`.
 */
export let isNumber = function isNumber(val) {
  let type = typeof val;

  return type === 'number' || (type === 'object' && toString(val) === numberClass);
};