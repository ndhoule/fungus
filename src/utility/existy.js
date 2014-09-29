/**
 * Checks a value for existiness, which is defined as any value other than
 * `null` or `undefined`.
 *
 * @name existy
 * @api public
 * @category Utility
 * @param {*} val The value to check for existiness.
 * @return {boolean} Returns `false if `val` is `null` or `undefined`, and true
 * otherwise.
 * @example
 * existy(null);
 * //=> false
 *
 * existy(undefined);
 * //=> false
 *
 * existy('');
 * //=> true
 *
 * existy(0);
 * //=> true
 */
let existy = function existy(val) {
  return val !== undefined && val !== null;
};

export default existy;
