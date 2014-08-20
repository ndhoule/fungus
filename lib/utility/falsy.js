/**
 * Tests whether or not a value is falsy. Falsiness in JavaScript is defined as
 * any of the following:
 *
 * - undefined
 * - null
 * - false
 * - '' (empty string)
 * - 0
 * - NaN
 *
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is falsy, `false` otherwise.
 */
export let falsy = function falsy(val) {
  return !val;
};
