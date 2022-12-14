import { formatFilesize, getUUID } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import { ResourceLink } from '@cloudrock/resource/ResourceLink';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';

const formatSize = (props) => {
  const filesize = formatFilesize(props.resource.size);
  return props.resource.bootable
    ? `${props.translate('bootable')} ${filesize}`
    : filesize;
};

const formatInstance = (props) =>
  props.resource.instance ? (
    <ResourceLink
      type="OpenStackTenant.Instance"
      uuid={getUUID(props.resource.instance)}
      project={props.resource.project_uuid}
      label={props.resource.instance_name}
    />
  ) : (
    <>&ndash;</>
  );

const PureOpenStackVolumeSummary = (props: ResourceSummaryProps) => {
  const { translate, resource } = props;
  return (
    <span>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Size')} value={formatSize(props)} />
      <Field label={translate('Attached to')} value={formatInstance(props)} />
      <Field label={translate('Device')} value={resource.device} />
      <Field
        label={translate('Availability zone')}
        value={resource.availability_zone_name}
      />
      <Field label={translate('Volume type')} value={resource.type_name} />
    </span>
  );
};

export const OpenStackVolumeSummary = withTranslation(
  PureOpenStackVolumeSummary,
);
