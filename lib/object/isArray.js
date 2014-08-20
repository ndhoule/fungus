import { arrayClass } from '../internal/classes';

// XXX
let toString = Object.prototype.toString;

let nativeIsArray = Array.isArray;

export let isArray = nativeIsArray || function(target) {
  return typeof target === 'object' && toString.call(target) === arrayClass;
};
