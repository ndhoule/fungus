import arithmetic from './arithmetic/index';
import array from './array/index';
import collection from './collection/index';
import fn from './function/index';
import logic from './logic/index';
import math from './math/index';
import object from './object/index';
import utility from './utility/index';

var modules = [arithmetic, array, collection, fn, logic, math, object, utility];

var fungus = collection.foldl(function(fungus, ns) {
  // TODO: Replace with array.flatten
  collection.forEach(function(func, name) {
    if (object.isFunction(func)) {
      fungus[name] = func;
    }
  }, ns);

  return fungus;
}, {}, modules);

export default fungus;
