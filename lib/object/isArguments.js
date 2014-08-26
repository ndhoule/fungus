import { argumentsClass } from '../internal/classes';

/**
 * Tests if a value is an arguments object.
 *
 * @name isArguments
 * @api public
 * @category Object
 * @param {*} val The value to test.
 * @return {boolean} Returns true if `val` is array-like, `false` otherwise.
 * @example
 * (function() {
 *   return isArguments(arguments);
 * }());
 * //=> true
 *
 * var args;
 * (function() { args = arguments; }());
 * isArguments(args);
 * //=> true
 *
 * isArguments([]);
 * //=> false
 *
 * isArguments({ length: 1 });
 * //=> false
 */
export let isArguments = function isArguments(val) {
  return Object.prototype.toString.call(val) === argumentsClass;
};
