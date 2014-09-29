/**
 * Tests if a value is a function.
 *
 * @name isFunction
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a function, otherwise `false`.
 * @example
 * isFunction({});
 * //=> false
 *
 * isFunction(1);
 * //=> false
 *
 * isFunction(function() {});
 * //=> true
 *
 * isFunction(Object);
 * //=> true
 */
let isFunction = function isFunction(val) {
  return typeof val === 'function';
};

export default isFunction;
