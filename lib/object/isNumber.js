import { numberClass } from '../internal/classes';
import { toString } from '../internal/utilities';

export let isNumber = function isNumber(target) {
  let type = typeof target;

  return type === 'number' || (type === 'object' && toString(target) === numberClass);
};
