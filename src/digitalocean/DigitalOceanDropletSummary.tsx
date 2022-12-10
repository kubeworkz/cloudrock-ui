import { withTranslation } from '@cloudrock/i18n';
import {
  Field,
  ResourceSummaryProps,
  PureVirtualMachineSummary,
} from '@cloudrock/resource/summary';

const PureDigitalOceanDropletSummary = (props: ResourceSummaryProps) => {
  const { translate, resource } = props;
  return (
    <span>
      <PureVirtualMachineSummary {...props} />
      <Field label={translate('Region')} value={resource.region_name} />
    </span>
  );
};

export const DigitalOceanDropletSummary = withTranslation(
  PureDigitalOceanDropletSummary,
);
