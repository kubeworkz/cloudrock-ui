import { lazyComponent } from '@cloudrock/core/lazyComponent';
import * as ProvidersRegistry from '@cloudrock/providers/registry';

const DigitalOceanForm = lazyComponent(
  () => import(/* webpackChunkName: "DigitalOceanForm" */ './DigitalOceanForm'),
  'DigitalOceanForm',
);

ProvidersRegistry.register({
  name: 'DigitalOcean',
  type: 'DigitalOcean',
  icon: 'icon-digitalocean.png',
  endpoint: 'digitalocean',
  component: DigitalOceanForm,
  serializer: (data) => ({ token: data.token }),
});
