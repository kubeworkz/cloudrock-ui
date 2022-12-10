import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ResourceStateConfigurationProvider } from '@cloudrock/resource/state/ResourceStateConfiguration';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

const OpenStackSnapshotSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackSnapshotSummary" */ './OpenStackSnapshotSummary'
    ),
  'OpenStackSnapshotSummary',
);
import './actions';
import './tabs';

ResourceSummary.register('OpenStackTenant.Snapshot', OpenStackSnapshotSummary);
ResourceStateConfigurationProvider.register('OpenStackTenant.Snapshot', {
  error_states: ['error'],
});
