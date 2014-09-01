import existy from '../utility/existy';
import isArguments from './isArguments';
import isObject from './isObject';

let toString = Object.prototype.toString;
let objPrototype = Object.prototype;

/**
 * Tests if a value is a plain object.
 *
 * @name isPlainObject
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is a plain object, otherwise `false`.
 * @example
 * isPlainObject({});
 * //=> true
 *
 * isPlainObject(new Object());
 * //=> true
 *
 * isPlainObject(Object.create(null));
 * //=> true
 *
 * var C = function() { this.c = true; };
 * isPlainObject(new C());
 * //=> false
 *
 * isPlainObject(/test/);
 * //=> false
 */
let isPlainObject = function isPlainObject(val) {
  if (!isObject(val) || isArguments(val)) {
    return false;
  }

  // TODO: Shim Object.getPrototypeOf for older environments
  let proto = Object.getPrototypeOf(val);

  return proto === null || proto  === objPrototype || val === objPrototype;
};

export default isPlainObject;
