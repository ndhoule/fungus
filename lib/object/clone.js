import { _slice } from '../internal/slice';
import { isArray } from './isArray';
import { isObject } from './isObject';
import { extend } from './extend';

export let clone = function clone(value) {
  if (isArray(value)) {
    return _slice(value);
  }

  if (isObject(value)) {
    return extend(value);
  }

  return value;
};
