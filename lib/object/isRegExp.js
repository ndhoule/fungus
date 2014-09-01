import existy from '../utility/existy';
import { regexpClass } from '../internal/classes';

let toString = Object.prototype.toString;

/**
 * Tests if a value is a regular expression.
 *
 * @name isRegExp
 * @api public
 * @category Object
 * @param {*} val The value to test
 * @return {boolean} Returns `true` if the value is `null`, `false` otherwise.
 * @example
 * isRegExp(/test/);
 * //=> false
 *
 * isRegExp(new RegExp('test'));
 * //=> false
 *
 * isRegExp({});
 * //=> false
 *
 * isRegExp(false);
 * //=> false
 *
 * isRegExp('test');
 * //=> false
 */
let isRegExp = function isRegExp(val) {
  return existy(val) && toString.call(val) === regexpClass;
};

export default isRegExp;
