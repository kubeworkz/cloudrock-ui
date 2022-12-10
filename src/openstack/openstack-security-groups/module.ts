import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import './actions';
import './breadcrumbs';
import './tabs';

const OpenStackSecurityGroupSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackSecurityGroupSummary" */ './OpenStackSecurityGroupSummary'
    ),
  'OpenStackSecurityGroupSummary',
);

ResourceSummary.register(
  'OpenStack.SecurityGroup',
  OpenStackSecurityGroupSummary,
);
