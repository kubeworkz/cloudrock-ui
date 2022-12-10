import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';
import { Attribute } from '@cloudrock/marketplace/types';
import { SLURM_PLUGIN, SLURM_REMOTE_PLUGIN } from '@cloudrock/slurm/constants';

const AllocationForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "AllocationForm" */ '@cloudrock/slurm/AllocationForm'
    ),
  'AllocationForm',
);

const ServiceSettingsAttributes = (): Attribute[] => [
  {
    key: 'hostname',
    title: translate('Hostname'),
    type: 'string',
  },
  {
    key: 'username',
    title: translate('Username'),
    type: 'string',
  },
  {
    key: 'port',
    title: translate('Port'),
    type: 'string',
  },
  {
    key: 'gateway',
    title: translate('Gateway'),
    type: 'string',
  },
  {
    key: 'use_sudo',
    title: translate('Use sudo'),
    type: 'string',
  },
  {
    key: 'default_account',
    title: translate('Default account'),
    type: 'string',
  },
];

registerOfferingType({
  type: SLURM_PLUGIN,
  get label() {
    return translate('SLURM allocation');
  },
  component: AllocationForm,
  providerType: 'SLURM',
  attributes: ServiceSettingsAttributes,
  allowToUpdateService: true,
});

registerOfferingType({
  type: SLURM_REMOTE_PLUGIN,
  get label() {
    return translate('SLURM remote allocation');
  },
  component: AllocationForm,
  providerType: 'SLURM remote',
  attributes: (): Attribute[] => [],
  allowToUpdateService: true,
});
