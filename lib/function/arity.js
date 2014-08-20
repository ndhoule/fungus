import { isFunction } from '../object/isFunction';
import { isNumber } from '../object/isNumber';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

 /**
  * TODO
  *
  * @private
  * @param n
  * @return {Function}
  */
let createArgNames = function createArgNames(n) {
  let args = [];

  for (let i = 1; i <= n; i += 1) {
    args.push('arg' + i);
  }

  return args;
};

 /**
  * Dynamically build up a wrapper function that sets the arity of a given
  * function.
  *
  * If at all possible, prefer a function from the arity wrapper cache above to
  * avoid allocating a new function at runtime.
  *
  * TODO
  *
  * @private
  * @param n
  * @return {Function}
  */
let makeArityWrapper = function makeWrapper(n) {
  let argNames = createArgNames(n).join(', ');
  let fnBody = ''.concat(
    '  return function(', argNames , ') {\n',
    '    return fn.apply(this, arguments);\n',
    '  };'
  );

  /* eslint-disable no-new-func */
  return new Function('fn', fnBody);
  /* eslint-enable no-new-func */
};

 /**
  * Create some premade arity wrappers to avoid constructing them at runtime.
  *
  * TODO
  *
  * @private
  * @param n
  * @return {Function}
  */
/* eslint-disable no-unused-lets */
let arityWrapperCache = [
  function(fn) {
    return function() {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4) {
      return fn.apply(this, arguments);
    };
  },

  function(fn) {
    return function(arg1, arg2, arg3, arg4, arg5) {
      return fn.apply(this, arguments);
    };
  }
];
/* eslint-enable no-unused-lets */

/**
 * A function that takes in a function and returns a new function of `n` arity,
 * delegating to the original function.
 *
 * @category Function
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A function of n arity, wrapping `fn`.
 */
// TODO: Should we curry this? curry's implementation depends on arity, so we'd
// need to resolve that dependency, perhaps by defining an internal currying
// function
export let arity = function arity(n, fn) {
  if (!isFunction(fn)) {
    throw NOT_FUNC_EXCEPTION;
  }

  n = Math.max(isNumber(n) ? n : 0, 0);

  if (!arityWrapperCache[n]) {
    arityWrapperCache[n] = makeArityWrapper(n);
  }

  return arityWrapperCache[n](fn);
};
