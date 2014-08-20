import { arity } from './arity';
import { isNumber } from '../object/isNumber';
import { isFunction } from '../object/isFunction';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

let wrapCurry = function wrapCurry(fn, remainingArity, previousArgs) {
  return arity(remainingArity, function(...newArgs) {
    let newArity = remainingArity - newArgs.length;
    let args = previousArgs.concat(newArgs);

    if (newArity > 0) {
      return wrapCurry(fn, newArity, args);
    }

    return fn.apply(this, args);
  });
};

export let curry = function curry(fn, fnArity) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  fnArity = isNumber(fnArity) ? fnArity : fn.length;

  // Wrap the input function in a curry wrapper.
  return wrapCurry(fn, fnArity, []);
};
