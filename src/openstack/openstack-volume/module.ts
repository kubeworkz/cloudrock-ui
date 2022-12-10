import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import { ResourceStateConfigurationProvider } from '@cloudrock/resource/state/ResourceStateConfiguration';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';
import './marketplace';
import './tabs';
const OpenStackVolumeSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackVolumeSummary" */ './OpenStackVolumeSummary'
    ),
  'OpenStackVolumeSummary',
);

ResourceSummary.register('OpenStackTenant.Volume', OpenStackVolumeSummary);
ActionRegistry.register('OpenStackTenant.Volume', actions);
ResourceStateConfigurationProvider.register('OpenStackTenant.Volume', {
  error_states: ['error'],
});
