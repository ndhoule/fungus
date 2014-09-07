import curry from '../function/curry';

/**
 * Determines whether or not two values are the same value.
 *
 * Behaves like the strict equality operator (`===`) except, unlike the strict equality operator,
 * `is` returns `true` when comparing `NaN` to `NaN`, and false when comparing `-0` to `0`.
 *
 * Curried version of the native ES6 [`Object.is`][Object.is] function.
 *
 * [Object.is]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 *
 * @name is
 * @api public
 * @category Object
 * @param {*} value1 The first value to compare.
 * @param {*} value2 The second value to compare.
 * @return {boolean} Returns `true` if the values are the same value, and `false` otherwise.
 * @example
 * is(NaN, NaN);
 * //=> true
 *
 * is(-0, 0);
 * //=> false
 *
 * is('same', 'same');
 * //=> true
 *
 * var obj = {};
 * is(obj, obj);
 * //=> true
 */
var is = Object.is ? curry(Object.is) : curry(function is(value1, value2) {
  // Normal values and check for 0 / -0
  if (value1 === value2) {
    return value1 !== 0 || 1 / value1 === 1 / value2;
  }
  // NaN
  return value1 !== value1 && value2 !== value2;
});

export default is;
