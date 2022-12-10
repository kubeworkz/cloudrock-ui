import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions';
import './breadcrumbs';
import './tabs';

const OpenStackNetworkSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackNetworkSummary" */ './OpenStackNetworkSummary'
    ),
  'OpenStackNetworkSummary',
);

ResourceSummary.register('OpenStack.Network', OpenStackNetworkSummary);
