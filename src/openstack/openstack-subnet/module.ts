import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions';
import './breadcrumbs';
import './tabs';

const OpenStackSubNetSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackSubNetSummary" */ './OpenStackSubNetSummary'
    ),
  'OpenStackSubNetSummary',
);

ResourceSummary.register('OpenStack.SubNet', OpenStackSubNetSummary);
