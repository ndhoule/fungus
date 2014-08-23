import { NO_ARGS_EXCEPTION, NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { foldl } from '../collection/foldl';
import { isFunction } from '../object/isFunction';

/**
 * Creates a function that is the [composition](https://en.wikipedia.org/wiki/Function_composition)
 * of a list of functions, where each function is passed the return value of the previous function.
 *
 * Compose is right-associative, which means functions are called in right-to-left order. For
 * example, the operation `h(g(f()))` is represented as `compose(h, g, f)`.
 *
 * @name compose
 * @api public
 * @category Function
 * @see {@link pipe}
 * @param {...Function} fns The functions to compose into a single function.
 * @return {Function} Returns a new function which, when called, will invoke each input function in
 * right-to-left order and return the result of the final function call.
 * @example
 * var add = function(a, b) { return a + b; };
 * var square = function(a, b) { return a + b; };
 *
 * var addThenSquare = compose(square, add);
 *
 * addThenSquare(1, 2);
 * //=> 9
 */
export let compose = function compose(...fns) {
  // Ensure all arguments are functions
  for (let i = 0; i < fns.length; i += 1) {
    if (!isFunction(fns[i])) {
      throw NOT_FUNC_EXCEPTION;
    }
  }

  let first = fns.pop();
  let rest = fns.reverse();

  // Ensure arguments were passed to `compose`
  if (!first) {
    throw NO_ARGS_EXCEPTION;
  }

  // If the user has passed only one function, there's no point in wrapping it
  if (!rest.length) {
    return first;
  }

  return arity(first.length, function() {
    return foldl(function(acc, fn) {
      return fn.call(this, acc);
    }, first.apply(this, arguments), rest);
  });
};
