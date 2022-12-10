import { formatFilesize, getUUID } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';

const formatVolume = (props) => (
  <ResourceLink
    type="OpenStackTenant.Volume"
    uuid={getUUID(props.source_volume)}
    project={props.project_uuid}
    label={props.source_volume_name}
  />
);

const PureOpenStackSnapshotSummary = (props: ResourceSummaryProps) => {
  const { translate, resource } = props;
  return (
    <span>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Size')} value={formatFilesize(resource.size)} />
      <Field label={translate('Volume')} value={formatVolume(resource)} />
    </span>
  );
};

export const OpenStackSnapshotSummary = withTranslation(
  PureOpenStackSnapshotSummary,
);
