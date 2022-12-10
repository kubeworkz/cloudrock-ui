import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './breadcrumbs';
import { DestroyFloatingIpAction } from './DestroyFloatingIpAction';
import { PullFloatingIpAction } from './PullFloatingIpAction';
const OpenStackFloatingIpSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackFloatingIpSummary" */ './OpenStackFloatingIpSummary'
    ),
  'OpenStackFloatingIpSummary',
);

ActionRegistry.register('OpenStack.FloatingIP', [
  PullFloatingIpAction,
  DestroyFloatingIpAction,
]);

ResourceSummary.register('OpenStack.FloatingIP', OpenStackFloatingIpSummary);
