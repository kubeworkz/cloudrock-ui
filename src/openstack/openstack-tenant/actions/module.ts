import { ActionRegistry } from '@cloudrock/resource/actions/registry';

import actions from './index';

ActionRegistry.register('OpenStack.Tenant', actions);
