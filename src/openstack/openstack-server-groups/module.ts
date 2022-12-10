import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions';
import './tabs';

const OpenStackServerGroupSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackServerGroupSummary" */ './OpenStackServerGroupSummary'
    ),
  'OpenStackServerGroupSummary',
);

ResourceSummary.register('OpenStack.ServerGroup', OpenStackServerGroupSummary);
