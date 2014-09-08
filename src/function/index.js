import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import arity from './arity';
import compose from './compose';
import curry from './curry';
import lPartial from './lPartial';
import memoize from './memoize';
import rPartial from './rPartial';
import wrap from './wrap';

defineAliases(['partialLeft'], lPartial);
defineAliases(['partialRight'], rPartial);

export default setupAliases({
  arity: arity,
  compose: compose,
  curry: curry,
  lPartial: lPartial,
  memoize: memoize,
  rPartial: rPartial,
  wrap: wrap
});
