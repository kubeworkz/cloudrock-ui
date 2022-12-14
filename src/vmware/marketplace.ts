import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';

const VMwareVirtualMachineForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "VMwareVirtualMachineForm" */ './VMwareVirtualMachineForm'
    ),
  'VMwareVirtualMachineForm',
);

const serializer = ({
  template,
  cluster,
  datastore,
  folder,
  networks,

  ...rest
}) => ({
  template: template && template.url,
  cluster: cluster && cluster.url,
  datastore: datastore && datastore.url,
  folder: folder && folder.url,
  networks: networks && networks.map(({ url }) => ({ url })),
  ...rest,
});

const limitSerializer = (limits) =>
  limits && {
    cpu: limits.cpu,
    ram: limits.ram && limits.ram * 1024,
    disk: limits.disk && limits.disk * 1024,
  };

const limitParser = (limits) =>
  limits && {
    cpu: limits.cpu,
    ram: limits.ram && limits.ram / 1024,
    disk: limits.disk && limits.disk / 1024,
  };

registerOfferingType({
  type: 'VMware.VirtualMachine',
  get label() {
    return translate('vSphere Virtual Machine');
  },
  component: VMwareVirtualMachineForm,
  providerType: 'VMware',
  serializer,
  limitSerializer,
  limitParser,
  allowToUpdateService: true,
});
