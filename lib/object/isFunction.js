/**
 * Tests if a value is a function.
 *
 * @name isFunction
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {undefined} Returns `true` if `val` is a function, otherwise `false`.
 */
export let isFunction = function isFunction(val) {
  return typeof val === 'function';
};
