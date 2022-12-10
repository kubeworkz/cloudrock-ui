import { withTranslation } from '@cloudrock/i18n';
import { OpenStackSecurityGroupsLink } from '@cloudrock/openstack/openstack-security-groups/OpenStackSecurityGroupsLink';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureVirtualMachineSummary,
} from '@cloudrock/resource/summary';

import { OpenStackInstance } from './types';

const formatSecurityGroups = (props) => {
  if (props.resource.security_groups) {
    return (
      <OpenStackSecurityGroupsLink items={props.resource.security_groups} />
    );
  } else {
    return null;
  }
};

const PureOpenStackInstanceSummary = (
  props: ResourceSummaryProps<OpenStackInstance>,
) => {
  const { translate } = props;
  return (
    <>
      <PureVirtualMachineSummary {...props} />
      <Field
        label={translate('Security groups')}
        value={formatSecurityGroups(props)}
      />
      {props.resource.server_group && (
        <Field
          label={translate('Server group')}
          value={props.resource.server_group.name}
          helpText={props.resource.server_group.policy}
        />
      )}
      <Field
        label={translate('Availability zone')}
        value={props.resource.availability_zone_name}
      />
      <Field
        label={translate('Hypervisor')}
        value={props.resource.hypervisor_hostname}
      />
      {props.resource.rancher_cluster && (
        <Field
          label={translate('Rancher cluster')}
          value={
            <ResourceLink
              type="Rancher.Cluster"
              uuid={props.resource.rancher_cluster.uuid}
              project={props.resource.project_uuid}
              label={props.resource.rancher_cluster.name}
            />
          }
        />
      )}
    </>
  );
};

export const OpenStackInstanceSummary = withTranslation(
  PureOpenStackInstanceSummary,
);
