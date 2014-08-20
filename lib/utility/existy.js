/**
 * Checks a value for existiness, which is defined as any value other than
 * `null` or `undefined`.
 *
 * @param {*} val The value to check for existiness.
 * @return {boolean} Returns `false if `val` is `null` or `undefined`, and true
 * otherwise.
 */
export let existy = function existy(val) {
  return val !== undefined && val !== null;
};
