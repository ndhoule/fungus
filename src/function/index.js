import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import arity from './arity';
import compose from './compose';
import curry from './curry';
import flip from './flip';
import lPartial from './lPartial';
import memoize from './memoize';
import pipe from './pipe';
import rPartial from './rPartial';
import wrap from './wrap';

defineAliases(['partialLeft'], lPartial);
defineAliases(['partialRight'], rPartial);

export default setupAliases({
  arity,
  compose,
  curry,
  flip,
  lPartial,
  memoize,
  pipe,
  rPartial,
  wrap
});
