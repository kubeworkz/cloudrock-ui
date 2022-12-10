import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { pick } from '@cloudrock/core/utils';
import * as ProvidersRegistry from '@cloudrock/providers/registry';

const VMwareForm = lazyComponent(
  () => import(/* webpackChunkName: "VMwareForm" */ './VMwareForm'),
  'VMwareForm',
);

const serializer = pick([
  'backend_url',
  'username',
  'password',
  'default_cluster_label',
  'max_cpu',
  'max_ram',
  'max_disk',
  'max_disk_total',
]);

ProvidersRegistry.register({
  name: 'VMware',
  type: 'VMware',
  icon: 'icon-vmware.png',
  endpoint: 'vmware',
  component: VMwareForm,
  serializer,
});
