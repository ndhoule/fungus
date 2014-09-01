/**
 * Tests whether or not a value is falsy. Falsiness in JavaScript is defined as
 * any of the following values:
 *
 * - `undefined`
 * - `null`
 * - `false`
 * - `'' (empty string)`
 * - `0`
 * - `NaN`
 *
 * @name falsy
 * @api public
 * @category Utility
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is falsy, `false` otherwise.
 * @example
 * falsy(null);
 * //=> true
 *
 * falsy('');
 * //=> true
 *
 * falsy('i exist');
 * //=> false
 *
 * falsy(true);
 * //=> false
 */
let falsy = function falsy(val) {
  return !val;
};

export default falsy;
