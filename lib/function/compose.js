import { NO_ARGS_EXCEPTION, NOT_FUNC_EXCEPTION } from '../internal/exceptions';
import { arity } from '../function/arity';
import { forEach } from '../collection/forEach';
import { isFunction } from '../object/isFunction';

let throwIfNotFunction = function throwIfNotFunction(arg) {
  if (!isFunction(arg)) {
    throw NOT_FUNC_EXCEPTION;
  }
};

export let compose = function compose(...fns) {
  // Ensure all arguments are functions
  forEach(throwIfNotFunction, fns);

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
    // TODO: Replace with internal foldl
    return rest.reduce((acc, fn) => {
      return fn.call(this, acc);
    }, first.apply(this, arguments));
  });
};
