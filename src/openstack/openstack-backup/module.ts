import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';
import './breadcrumbs';
const OpenStackBackupSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenStackBackupSummary" */ './OpenStackBackupSummary'
    ),
  'OpenStackBackupSummary',
);

import './tabs';

ResourceSummary.register('OpenStackTenant.Backup', OpenStackBackupSummary);
ActionRegistry.register('OpenStackTenant.Backup', actions);
