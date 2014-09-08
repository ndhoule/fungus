import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import and from './and';
import eq from './eq';
import gt from './gt';
import gte from './gte';
import lt from './lt';
import lte from './lte';
import or from './or';

defineAliases(['equals'], eq);

export default setupAliases({
  and: and,
  eq: eq,
  gt: gt,
  gte: gte,
  lt: lt,
  lte: lte,
  or: or
});
