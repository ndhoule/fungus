import _slice from '../internal/slice';
import isArray from './isArray';
import isObject from './isObject';
import extend from './extend';

/**
 * Produces a shallow clone of the input `value`.
 *
 * If the value is an array, returns a new array with all of the values in the
 * input array. If the value is an object, returns a new object with all the
 * enumerable properties of the input object.
 *
 * If the value is a primitive or a function, returns the original value.
 *
 * @name clone
 * @api public
 * @category Object
 * @see {@link cloneDeep}
 * @param {Array|Object} value The value to clone.
 * @return {*} An object of the input type.
 * @example
 * var obj = { val: 1, child: {} };
 * var clonedObj = clone(obj);
 *
 * console.log(clonedObj.val);
 * //-> 1
 *
 * console.log(obj === clonedObj);
 * //-> false
 *
 * // Does not perform a deep copy--any complex values are simply referenced on
 * // the new object
 * console.log(clonedObj.child === obj.child);
 * //-> true
 * clonedObj.child.val = 100;
 * console.log(obj.child.val);
 * //-> 100
 */
let clone = function clone(value) {
  if (isArray(value)) {
    return _slice(value);
  }

  if (isObject(value)) {
    return extend(value);
  }

  return value;
};

export default clone;
