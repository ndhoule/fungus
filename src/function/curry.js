import arity from './arity';
import isFunction from '../object/isFunction';
import isNumber from '../object/isNumber';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

/**
 * TODO
 *
 * @name wrapCurry
 * @api private
 * @param fn
 * @param remainingArity
 * @param previousArgs
 * @return {undefined}
 */
var wrapCurry = function wrapCurry(fn, remainingArity, previousArgs) {
  return arity(remainingArity, function(...newArgs) {
    var newArity = remainingArity - newArgs.length;
    var args = previousArgs.concat(newArgs);

    if (newArity > 0) {
      return wrapCurry(fn, newArity, args);
    }

    return fn.apply(this, args);
  });
};

/**
 * Accepts a function `fn` and returns a new function that, when invoked, will repeatedly return a
 * new wrapper function until all expected arguments have been provided.
 *
 * @name curry
 * @api public
 * @category Function
 * @param {Function} fn The function to wrap.
 * @param {number} [fnArity=fn.length] The optional desired arity of the return function.
 * @return {Function} A curried function that, when invoked, will return either a new curried
 * function (if not all expected arguments have been provided), or the result of calling `fn`.
 * @example
 * var addThreeItems = function(a, b, c) { return a + b + c; };
 * var curriedAddThreeItems = curry(addThreeItems);
 * curriedAddThreeItems(2)(3)(4);
 * //=> 9
 *
 * var curriedReduce = curry(reduce);
 * var add = function(a, b) { return a + b; };
 * var sumArray = curriedReduce(add, 0);
 * sumArray([1, 2, 3]);
 * //=> 6
 */
var curry = function curry(fn, fnArity) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  fnArity = isNumber(fnArity) ? fnArity : fn.length;

  return wrapCurry(fn, fnArity, []);
};

export default curry;
