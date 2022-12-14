import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { pick } from '@cloudrock/core/utils';
import * as ProvidersRegistry from '@cloudrock/providers/registry';

const RancherProviderForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "RancherProviderForm" */ './RancherProviderForm'
    ),
  'RancherProviderForm',
);

const serializer = pick([
  'backend_url',
  'username',
  'password',
  'base_image_name',
  'cloud_init_template',
]);

ProvidersRegistry.register({
  name: 'Rancher',
  type: 'Rancher',
  icon: 'icon-rancher.png',
  endpoint: 'rancher',
  component: RancherProviderForm,
  serializer,
});
