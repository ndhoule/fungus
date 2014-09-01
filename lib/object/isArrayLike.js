import existy from '../utility/existy';
import isArray from './isArray';
import isFunction from './isFunction';
import isNumber from './isNumber';

/**
 * A function used to test if something is array-like. An array-like structure
 * is defined using the following rules:
 *
 * - Is not a function
 * - Has a numeric `.length` property
 *
 * @api private
 * @category Object
 * @see {@link isArray}
 * @param {*} val The value to test.
 * @return {boolean} Returns true if `val` is array-like, `false` otherwise.
 */
let isArrayLike = function isArrayLike(val) {
  return existy(val) && (isArray(val) || ( !isFunction(val) && isNumber(val.length) ));
};

export default isArrayLike;
