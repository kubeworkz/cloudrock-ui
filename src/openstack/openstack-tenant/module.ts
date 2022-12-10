import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions/module';
import { DestroyPortAction } from './DestroyPortAction';
import './tabs';

const OpenStackTenantSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackTenantSummary" */ './OpenStackTenantSummary'
    ),
  'OpenStackTenantSummary',
);

const OpenStackRouterSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackRouterSummary" */ './OpenStackRouterSummary'
    ),
  'OpenStackRouterSummary',
);

ResourceSummary.register('OpenStack.Tenant', OpenStackTenantSummary);
ResourceSummary.register('OpenStack.Router', OpenStackRouterSummary);
ActionRegistry.register('OpenStack.Port', [DestroyPortAction]);
