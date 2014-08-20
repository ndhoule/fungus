/**
 * Tests if a value is a function.
 *
 * @param {*} val The value to test.
 * @return {undefined} Returns `true` if `val` is a function, otherwise `false`.
 */
export let isFunction = function isFunction(val) {
  return typeof val === 'function';
};
