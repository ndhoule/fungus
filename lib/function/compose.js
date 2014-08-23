import { NO_ARGS_EXCEPTION, NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { foldl } from '../collection/foldl';
import { isFunction } from '../object/isFunction';

let throwIfNotFunction = function throwIfNotFunction(arg) {
};

/**
 * TODO
 *
 * @name compose
 * @api public
 * @category Function
 * @param {...Function} ...fns TODO
 * @return {*} The result of calling each function in turn.
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
