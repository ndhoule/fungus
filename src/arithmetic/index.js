import defineAliases from '../internal/defineAliases';
import setupAliases from '../internal/setupAliases';
import add from './add';
import divide from './divide';
import modulo from './modulo';
import multiply from './multiply';
import negate from './negate';
import remainder from './remainder';
import subtract from './subtract';

defineAliases(['mod'], modulo);
defineAliases(['rem'], remainder);

export default setupAliases({
  add: add,
  divide: divide,
  modulo: modulo,
  multiply: multiply,
  negate: negate,
  remainder: remainder,
  subtract: subtract
});
