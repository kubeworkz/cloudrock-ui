import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionRegistry } from '@cloudrock/resource/actions/registry';
import * as ResourceSummary from '@cloudrock/resource/summary/registry';
import { ResourceTabsConfiguration } from '@cloudrock/resource/tabs/ResourceTabsConfiguration';

import nodeActions from './actions';
import './breadcrumbs';

const RancherNodeSummary = lazyComponent(
  () =>
    import(/* webpackChunkName: "RancherNodeSummary" */ './RancherNodeSummary'),
  'RancherNodeSummary',
);

ResourceTabsConfiguration.register('Rancher.Node', () => []);
ResourceSummary.register('Rancher.Node', RancherNodeSummary);
ActionRegistry.register('Rancher.Node', nodeActions);
