import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';

const formatTenant = (props) => (
  <ResourceLink
    type="OpenStack.Tenant"
    uuid={props.tenant_uuid}
    project={props.project_uuid}
    label={props.tenant_name}
  />
);

const PureOpenStackSecurityGroupSummary = (props: ResourceSummaryProps) => {
  const { translate } = props;
  return (
    <span>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Tenant')} value={formatTenant(props.resource)} />
    </span>
  );
};

export const OpenStackSecurityGroupSummary = withTranslation(
  PureOpenStackSecurityGroupSummary,
);
