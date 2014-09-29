import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import contains from './contains';
import foldl from './foldl';
import forEach from './forEach';
import forEachRight from './forEachRight';
import groupBy from './groupBy';
import map from './map';
import size from './size';

defineAliases(['reduce', 'reduceLeft'], foldl);
defineAliases(['each'], forEach);
defineAliases(['eachRight'], forEachRight);
defineAliases(['map'], map);

export default setupAliases({
  contains,
  foldl,
  forEach,
  forEachRight,
  groupBy,
  map,
  size
});
