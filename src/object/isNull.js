/**
 * Tests if a value is `null`.
 *
 * @name isNull
 * @api public
 * @category Object
 * @param {*} val The value to test
 * @return {boolean} Returns `true` if the value is `null`, `false` otherwise.
 * @example
 * isNull(null);
 * //=> true
 *
 * isNull();
 * //=> false
 *
 * isNull(false);
 * //=> false
 *
 * isNull('test');
 * //=> false
 */
var isNull = function isNull(val) {
  return val === null;
};

export default isNull;
