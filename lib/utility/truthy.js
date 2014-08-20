/**
 * Tests whether or not a value is truthy. Truthiness in JavaScript is defined
 * as any value *except* one of the following values:
 *
 * - undefined
 * - null
 * - false
 * - '' (empty string)
 * - 0
 * - NaN
 *
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is truthy, `false` otherwise.
 */
export let truthy = function truthy(val) {
  return !!val;
};
