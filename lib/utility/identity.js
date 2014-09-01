/**
 * A function that returns whatever is passed to it.
 *
 * @name identity
 * @api public
 * @category Utility
 * @param {*} val The input value.
 * @return {*} The input value, `val`.
 * @example
 * identity(1);
 * //=> 1
 *
 * var obj = {};
 * identity(obj) === obj;
 * //=> true
 */
let identity = function identity(val) {
  return val;
};

export default identity;
