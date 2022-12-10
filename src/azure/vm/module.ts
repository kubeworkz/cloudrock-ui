import './marketplace';
import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';

import actions from './actions';

const AzureVirtualMachineSummary = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AzureVirtualMachineSummary" */ './AzureVirtualMachineSummary'
    ),
  'AzureVirtualMachineSummary',
);

ResourceSummary.register('Azure.VirtualMachine', AzureVirtualMachineSummary);
ActionRegistry.register('Azure.VirtualMachine', actions);
