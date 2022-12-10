import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import { ResourceStateConfigurationProvider } from '@cloudrock/resource/state/ResourceStateConfiguration';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';

import './marketplace';
import './tabs';

const OpenStackInstanceSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackInstanceSummary" */ './OpenStackInstanceSummary'
    ),
  'OpenStackInstanceSummary',
);

ResourceSummary.register('OpenStackTenant.Instance', OpenStackInstanceSummary);
ActionRegistry.register('OpenStackTenant.Instance', actions);
ResourceStateConfigurationProvider.register('OpenStackTenant.Instance', {
  error_states: ['ERROR'],
  shutdown_states: ['SHUTOFF', 'STOPPED', 'SUSPENDED'],
});
