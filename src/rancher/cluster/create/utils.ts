import { ENV } from '@cloudrock/configs/default';
import { getUUID } from '@cloudrock/core/utils';
import { translate } from '@cloudrock/i18n';
import { Offering } from '@cloudrock/marketplace/types';
import {
  loadSecurityGroups,
  getFlavors,
  getSubnets,
  getVolumeTypes,
} from '@cloudrock/openstack/api';
import { Flavor, Subnet } from '@cloudrock/openstack/openstack-instance/types';
import {
  formatVolumeTypeChoices,
  getDefaultVolumeType,
} from '@cloudrock/openstack/openstack-instance/utils';
import { listClusterTemplates } from '@cloudrock/rancher/api';
import { formatFlavor } from '@cloudrock/resource/utils';

const CLUSTER_NAME_PATTERN = new RegExp('^[a-z0-9]([-a-z0-9])+[a-z0-9]$');

export const rancherClusterName = (value: string) =>
  !value.match(CLUSTER_NAME_PATTERN)
    ? translate('Name must consist of lower case alphanumeric characters.')
    : undefined;

const formatSubnetOption = (subnet: Subnet) => ({
  label: `${subnet.network_name} / ${subnet.name} (${subnet.cidr})`,
  value: subnet.url,
});

const formatFlavorOption = (flavor: Flavor) => ({
  ...flavor,
  label: `${flavor.name} (${formatFlavor(flavor)})`,
  value: flavor.url,
});

const getMountPointChoices = () => {
  const mountPoints = ENV.plugins.CLOUDROCK_RANCHER.MOUNT_POINT_CHOICES;
  return mountPoints.map((choice) => ({
    label: choice,
    value: choice,
  }));
};

export const loadData = async (settings: string, offering: Offering) => {
  const params = { settings };
  const flavors = await getFlavors({
    ...params,
    name_iregex: offering.plugin_options.flavors_regex,
  });
  const subnets = await getSubnets(params);
  const volumeTypes = await getVolumeTypes(params);
  const templates = await listClusterTemplates();
  const volumeTypeChoices = formatVolumeTypeChoices(volumeTypes);
  const defaultVolumeType = getDefaultVolumeType(volumeTypeChoices);
  const securityGroups = await loadSecurityGroups(getUUID(settings));
  return {
    subnets: subnets.map(formatSubnetOption),
    flavors: flavors.map(formatFlavorOption),
    volumeTypes: volumeTypeChoices,
    defaultVolumeType: defaultVolumeType && defaultVolumeType.url,
    mountPoints: getMountPointChoices(),
    templates,
    securityGroups,
  };
};

export const getDataVolumes = (nodeIndex, allValues) => {
  if (nodeIndex !== undefined) {
    const nodes = allValues.attributes.nodes;
    if (nodeIndex >= nodes.length) {
      return [];
    }
    return nodes[nodeIndex].data_volumes || [];
  } else {
    return allValues.data_volumes || [];
  }
};
