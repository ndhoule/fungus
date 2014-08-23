import { isFunction } from '../object/isFunction';
import { isNumber } from '../object/isNumber';
import { NOT_FUNC_EXCEPTION } from '../internal/exceptions';

 /**
  * TODO
  *
  * @name createArgNames
  * @api private
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
  * @name makeArityWrapper
  * @api private
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

  /*! eslint-disable no-new-func */
  return new Function('fn', fnBody);
  /*! eslint-enable no-new-func */
};

 /**
  * Create some premade arity wrappers to avoid constructing them at runtime.
  *
  * TODO
  *
  * @name arityWrapperCache
  * @api private
  * @param n
  * @return {Function}
  */
/*! eslint-disable no-unused-lets */
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
/*! eslint-enable no-unused-lets */

/**
 * Takes a function and an [arity](https://en.wikipedia.org/wiki/Arity) `n`, and returns a new
 * function that expects `n` arguments.
 *
 * @name arity
 * @api public
 * @category Function
 * @see {@link curry}
 * @param {Number} n The desired arity of the returned function.
 * @param {Function} fn The function to wrap.
 * @return {Function} A function of n arity, wrapping `fn`.
 * @example
 * var add = function(a, b) {
 *   return a + b;
 * };
 *
 * // See the number of arguments this function expects by accessing `.length`:
 * add.length;
 * //=> 2
 *
 * var unaryAdd = arity(1, add);
 *
 * // Only expects one argument
 * unaryAdd.length;
 * //=> 1
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
