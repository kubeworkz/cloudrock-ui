import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { registerOfferingType } from '@cloudrock/marketplace/common/registry';
import { parseQuotas, parseQuotasUsage } from '@cloudrock/openstack/utils';

import { getVolumeTypeRequirements } from './utils';

const OpenstackInstanceDetails = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenstackInstanceDetails" */ '@cloudrock/openstack/openstack-instance/OpenstackInstanceDetails'
    ),
  'OpenstackInstanceDetails',
);
const OpenstackInstanceCheckoutSummary = lazyComponent(
  () =>
    import(
      '@cloudrock/openstack/openstack-instance/OpenstackInstanceCheckoutSummary'
    ),
  'OpenstackInstanceCheckoutSummary',
);
const OpenstackInstanceCreateForm = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "OpenstackInstanceCreateForm" */ './OpenstackInstanceCreateForm'
    ),
  'OpenstackInstanceCreateForm',
);

const serializeFloatingIPs = (networks) => {
  if (!networks) {
    return undefined;
  }
  return networks
    .filter((item) => item.floatingIp.url !== 'false')
    .map((item) => {
      // Auto-assign floating IP
      if (item.floatingIp.url === 'true') {
        return {
          subnet: item.subnet.url,
        };
      } else {
        return {
          subnet: item.subnet.url,
          url: item.floatingIp.url,
        };
      }
    });
};

const serializeInternalIps = (networks) => {
  if (!networks) {
    return undefined;
  }
  return networks.map((network) => ({
    subnet: network.subnet.url,
  }));
};

const serializeSecurityGroups = (groups) => {
  if (!groups) {
    return undefined;
  }
  return groups.map((group) => ({
    url: group.url,
  }));
};

const serializeServerGroup = (group) => {
  if (!group) {
    return undefined;
  }
  return group.url;
};

const serializer = ({
  name,
  description,
  user_data,
  image,
  flavor,
  networks,
  system_volume_size,
  data_volume_size,
  system_volume_type,
  data_volume_type,
  ssh_public_key,
  security_groups,
  server_group,
  availability_zone,
  connect_directly_to_external_network,
}) => ({
  name,
  description,
  user_data,
  image: image ? image.url : undefined,
  flavor: flavor ? flavor.url : undefined,
  ssh_public_key: ssh_public_key ? ssh_public_key.url : undefined,
  security_groups: serializeSecurityGroups(security_groups),
  server_group: serializeServerGroup(server_group),
  internal_ips_set: serializeInternalIps(networks),
  floating_ips: serializeFloatingIPs(networks),
  system_volume_size,
  data_volume_size: data_volume_size ? data_volume_size : undefined,
  system_volume_type: system_volume_type && system_volume_type.value,
  data_volume_type: data_volume_type && data_volume_type.value,
  availability_zone,
  connect_directly_to_external_network: connect_directly_to_external_network,
});

const formValidator = (props) => {
  const {
    offering,
    values: { attributes },
  } = props;
  if (!attributes) {
    return;
  }
  if (!offering.quotas) {
    return;
  }
  // TODO: Use memoization to avoid unnecessary quotas parsing
  const limits: Record<string, number> = parseQuotas(offering.quotas);
  const usages: Record<string, number> = parseQuotasUsage(offering.quotas);
  const errors: Record<string, string> = {};
  if (attributes.flavor) {
    if (
      limits.cores !== -1 &&
      attributes.flavor.cores + usages.cores > limits.cores
    ) {
      errors.flavor = translate('vCPU limit is exceeded');
    }
    if (limits.ram !== -1 && attributes.flavor.ram + usages.ram > limits.ram) {
      errors.flavor = translate('RAM limit is exceeded');
    }
  }
  if (
    limits.disk !== -1 &&
    usages.disk +
      attributes.system_volume_size +
      (attributes.data_volume_size || 0) >
      limits.disk
  ) {
    errors.system_volume_size = errors.data_volume_size = translate(
      'Total storage limit is exceeded',
    );
  }
  if (isFeatureVisible('openstack.volume_types')) {
    const required = getVolumeTypeRequirements(attributes);
    for (const name in required) {
      if (limits[name] !== -1 && required[name] + usages[name] > limits[name]) {
        errors.system_volume_size = errors.data_volume_size = translate(
          'Volume type storage limit is exceeded',
        );
      }
    }
  }
  return { attributes: errors };
};

registerOfferingType({
  type: 'OpenStackTenant.Instance',
  get label() {
    return translate('OpenStack instance');
  },
  component: OpenstackInstanceCreateForm,
  detailsComponent: OpenstackInstanceDetails,
  checkoutSummaryComponent: OpenstackInstanceCheckoutSummary,
  serializer,
  formValidator,
  disableOfferingCreation: true,
  allowToUpdateService: true,
});

registerOfferingType({
  type: 'OpenStackTenant.SharedInstance',
  get label() {
    return translate('OpenStack shared instance');
  },
  component: OpenstackInstanceCreateForm,
  detailsComponent: OpenstackInstanceDetails,
  checkoutSummaryComponent: OpenstackInstanceCheckoutSummary,
  serializer,
  formValidator,
  allowToUpdateService: true,
  providerType: 'OpenStackTenant',
});
