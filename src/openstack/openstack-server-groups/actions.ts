import { DestroyServerGroupAction } from '@cloudrock/openstack/openstack-server-groups/DestroyServerGroupAction';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';

import { PullServerGroupAction } from './PullServerGroupAction';

ActionRegistry.register('OpenStack.ServerGroup', [
  PullServerGroupAction,
  DestroyServerGroupAction,
]);
