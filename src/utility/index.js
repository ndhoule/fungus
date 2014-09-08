import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import existy from './existy';
import falsy from './falsy';
import get from './get';
import identity from './identity';
import noop from './noop';
import not from './not';
import truthy from './truthy';

defineAliases(['dot'], get);

export default setupAliases({
  existy: existy,
  falsy: falsy,
  get: get,
  identity: identity,
  noop: noop,
  not: not,
  truthy: truthy
});
