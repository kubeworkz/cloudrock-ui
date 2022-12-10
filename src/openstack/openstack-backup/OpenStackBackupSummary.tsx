import { getUUID } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';

const formatInstance = (props) => (
  <ResourceLink
    type="OpenStackTenant.Instance"
    uuid={getUUID(props.instance)}
    project={props.project_uuid}
    label={props.instance_name}
  />
);

const PureOpenStackBackupSummary = (props: ResourceSummaryProps) => {
  const { translate, resource } = props;
  return (
    <span>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Instance')} value={formatInstance(resource)} />
    </span>
  );
};

export const OpenStackBackupSummary = withTranslation(
  PureOpenStackBackupSummary,
);
