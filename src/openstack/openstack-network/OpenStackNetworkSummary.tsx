import { getUUID } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';
import { formatDefault } from '@cloudrock/resource/utils';

import { Network } from './types';

const formatTenant = (props) => (
  <ResourceLink
    type="OpenStack.Tenant"
    uuid={getUUID(props.tenant)}
    project={props.project_uuid}
    label={props.tenant_name}
  />
);

const PureOpenStackNetworkSummary = (props: ResourceSummaryProps<Network>) => {
  const { translate, resource } = props;
  return (
    <span>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Tenant')} value={formatTenant(resource)} />
      <Field
        label={translate('Type')}
        value={formatDefault(resource.type)}
        valueClass="ellipsis"
      />
      <Field
        label={translate('Segmentation ID')}
        value={formatDefault(resource.segmentation_id)}
      />
      <Field
        label={translate('Is external')}
        value={resource.is_external ? translate('Yes') : translate('No')}
      />
      <Field label={translate('MTU')} value={formatDefault(resource.mtu)} />
    </span>
  );
};

export const OpenStackNetworkSummary = withTranslation(
  PureOpenStackNetworkSummary,
);
