import arithmetic from './arithmetic/index';
import array from './array/index';
import collection from './collection/index';
import fn from './function/index';
import logic from './logic/index';
import object from './object/index';
import utility from './utility/index';

let fnjs = {};

// Arithmetic
fnjs.add = arithmetic.add;
fnjs.divide = arithmetic.divide;
fnjs.modulo = arithmetic.modulo;
fnjs.multiply = arithmetic.multiply;
fnjs.negate = arithmetic.negate;
fnjs.remainder = arithmetic.remainder;
fnjs.subtract = arithmetic.subtract;

// Array
fnjs.compact = array.compact;
fnjs.filter = array.filter;
fnjs.first = array.first;
fnjs.rest = array.rest;

// Collection
fnjs.foldl = collection.foldl;
fnjs.foldr = collection.foldr;
fnjs.forEach = collection.forEach;
fnjs.groupBy = collection.groupBy;
fnjs.map = collection.map;

// Function
fnjs.arity = fn.arity;
fnjs.compose = fn.compose;
fnjs.curry = fn.curry;
fnjs.lPartial = fn.lPartial;
fnjs.memoize = fn.memoize;
fnjs.rPartial = fn.rPartial;

// Logic
fnjs.and = logic.and;
fnjs.eq = logic.eq;
fnjs.gt = logic.gt;
fnjs.gte = logic.gte;
fnjs.lt = logic.lt;
fnjs.lte = logic.lte;
fnjs.or = logic.or;

// Object
fnjs.isArguments = object.isArguments;
fnjs.isArray = object.isArray;
fnjs.isArrayLike = object.isArrayLike;
fnjs.isBoolean = object.isBoolean;
fnjs.isDate = object.isDate;
fnjs.isFinite = object.isFinite;
fnjs.isFunction = object.isFunction;
fnjs.isNaN = object.isNaN;
fnjs.isNull = object.isNull;
fnjs.isNumber = object.isNumber;
fnjs.isObject = object.isObject;
fnjs.isPlainObject = object.isPlainObject;
fnjs.isRegExp = object.isRegExp;
fnjs.isString = object.isString;
fnjs.isUndefined = object.isUndefined;
fnjs.keys = object.keys;

// Utility
fnjs.existy = utility.existy;
fnjs.falsy = utility.falsy;
fnjs.get = utility.get;
fnjs.identity = utility.identity;
fnjs.noop = utility.noop;
fnjs.not = utility.not;
fnjs.truthy = utility.truthy

export default fnjs;
