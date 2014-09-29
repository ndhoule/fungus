import existy from '../utility/existy';
import { dateClass } from '../internal/classes';

let toString = Object.prototype.toString;

/**
 * Tests if a value is a date object.
 *
 * @name isDate
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns `true` if `val` is a date object, otherwise `false`.
 * @example
 * isDate(new Date());
 * //=> true
 *
 * isDate(new Date(1409017499149));
 * //=> true
 *
 * isDate(1409017499149);
 * //=> false
 *
 * isDate(new Date().toString());
 * //=> false
 */
let isDate = function isDate(val) {
  return existy(val) && toString.call(val) === dateClass;
};

export default isDate;
