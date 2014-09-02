import existy from '../utility/existy';

/**
 * Tests if a value is an object.
 *
 * @name isObject
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if the value is an object, otherwise `false`.
 * @example
 * isObject({});
 * //=> true
 *
 * isObject([]);
 * //=> true
 *
 * isObject(new String('string'));
 * //=> true
 *
 * isObject('string');
 * //=> false
 *
 * isObject(null);
 * //=> false
 *
 * isObject(0);
 * //=> false
 */
var isObject = function isObject(val) {
  return existy(val) && typeof val === 'object';
};

export default isObject;
