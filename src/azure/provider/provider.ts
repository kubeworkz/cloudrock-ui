import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { pick } from '@cloudrock/core/utils';
import * as ProvidersRegistry from '@cloudrock/providers/registry';

const AzureForm = lazyComponent(
  () => import(/* webpackChunkName: "AzureForm" */ './AzureForm'),
  'AzureForm',
);

const serializer = pick([
  'tenant_id',
  'client_id',
  'client_secret',
  'subscription_id',
]);

ProvidersRegistry.register({
  name: 'Azure',
  type: 'Azure',
  icon: 'icon-azure.png',
  endpoint: 'azure',
  component: AzureForm,
  serializer,
});
