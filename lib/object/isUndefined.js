const UNDEFINED = void(0);

/**
 * Tests if a value is undefined.
 *
 * @name isUndefined
 * @api public
 * @category Object
 * @param {*} val
 * @return {boolean} Returns `true` if the value is undefined, otherwise `false`.
 * @example
 * isUndefined();
 * //=> true
 *
 * isUndefined(undefined);
 * //=> true
 *
 * isUndefined(null);
 * //=> false
 *
 * isUndefined(0);
 * //=> false
 *
 * isUndefined({});
 * //=> false
 */
let isUndefined = function isUndefined(val) {
  return val === UNDEFINED;
};

export default isUndefined;
