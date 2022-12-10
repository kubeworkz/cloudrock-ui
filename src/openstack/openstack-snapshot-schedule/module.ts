import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import { ResourceStateConfigurationProvider } from '@cloudrock/resource/state/ResourceStateConfiguration';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';
import './breadcrumbs';
import './tabs';
const OpenStackSnapshotScheduleSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackSnapshotScheduleSummary" */ './OpenStackSnapshotScheduleSummary'
    ),
  'OpenStackSnapshotScheduleSummary',
);

ActionRegistry.register('OpenStackTenant.SnapshotSchedule', actions);
ResourceSummary.register(
  'OpenStackTenant.SnapshotSchedule',
  OpenStackSnapshotScheduleSummary,
);
ResourceStateConfigurationProvider.register(
  'OpenStackTenant.SnapshotSchedule',
  {
    error_states: ['error'],
  },
);
