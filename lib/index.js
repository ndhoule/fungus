import arithmetic from './arithmetic/index';
import array from './array/index';
import collection from './collection/index';
import fn from './function/index';
import logic from './logic/index';
import object from './object/index';
import utility from './utility/index';

var fungus = {};

// Arithmetic
fungus.add = arithmetic.add;
fungus.divide = arithmetic.divide;
fungus.modulo = arithmetic.modulo;
fungus.multiply = arithmetic.multiply;
fungus.negate = arithmetic.negate;
fungus.remainder = arithmetic.remainder;
fungus.subtract = arithmetic.subtract;

// Array
fungus.compact = array.compact;
fungus.filter = array.filter;
fungus.first = array.first;
fungus.rest = array.rest;

// Collection
fungus.foldl = collection.foldl;
fungus.foldr = collection.foldr;
fungus.forEach = collection.forEach;
fungus.groupBy = collection.groupBy;
fungus.map = collection.map;

// Function
fungus.arity = fn.arity;
fungus.compose = fn.compose;
fungus.curry = fn.curry;
fungus.lPartial = fn.lPartial;
fungus.memoize = fn.memoize;
fungus.rPartial = fn.rPartial;

// Logic
fungus.and = logic.and;
fungus.eq = logic.eq;
fungus.gt = logic.gt;
fungus.gte = logic.gte;
fungus.lt = logic.lt;
fungus.lte = logic.lte;
fungus.or = logic.or;

// Object
fungus.clone = object.clone;
fungus.extend = object.extend;
fungus.findKey = object.findKey;
fungus.forIn = object.forIn;
fungus.forInRight = object.forInRight;
fungus.forOwn = object.forOwn;
fungus.forOwnRight = object.forOwnRight;
fungus.has = object.has;
fungus.invert = object.invert;
fungus.isArguments = object.isArguments;
fungus.isArray = object.isArray;
fungus.isArrayLike = object.isArrayLike;
fungus.isBoolean = object.isBoolean;
fungus.isDate = object.isDate;
fungus.isFinite = object.isFinite;
fungus.isFunction = object.isFunction;
fungus.isNaN = object.isNaN;
fungus.isNull = object.isNull;
fungus.isNumber = object.isNumber;
fungus.isObject = object.isObject;
fungus.isPlainObject = object.isPlainObject;
fungus.isRegExp = object.isRegExp;
fungus.isString = object.isString;
fungus.isUndefined = object.isUndefined;
fungus.keys = object.keys;
fungus.mapObject = object.mapObject;
fungus.omit = object.omit;
fungus.pairs = object.pairs;
fungus.pick = object.pick;
fungus.values = object.values;

// Utility
fungus.existy = utility.existy;
fungus.falsy = utility.falsy;
fungus.get = utility.get;
fungus.identity = utility.identity;
fungus.noop = utility.noop;
fungus.not = utility.not;
fungus.truthy = utility.truthy;

export default fungus;
