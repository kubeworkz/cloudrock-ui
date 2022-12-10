import { ActionRegistry } from '@cloudrock/resource/actions/registry';

import { DestroyServerAction } from './DestroyServerAction';

ActionRegistry.register('Azure.SQLServer', [DestroyServerAction]);
