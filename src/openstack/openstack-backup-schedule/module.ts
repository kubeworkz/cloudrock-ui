import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import { ResourceStateConfigurationProvider } from '@cloudrock/resource/state/ResourceStateConfiguration';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';
import './breadcrumbs';
import './tabs';
const OpenStackBackupScheduleSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackBackupScheduleSummary" */ './OpenStackBackupScheduleSummary'
    ),
  'OpenStackBackupScheduleSummary',
);

ActionRegistry.register('OpenStackTenant.BackupSchedule', actions);
ResourceSummary.register(
  'OpenStackTenant.BackupSchedule',
  OpenStackBackupScheduleSummary,
);
ResourceStateConfigurationProvider.register('OpenStackTenant.BackupSchedule', {
  error_states: ['error'],
});
