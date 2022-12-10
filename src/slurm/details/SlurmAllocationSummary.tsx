import { minutesToHours } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import {
  Field,
  ResourceSummaryProps,
  PureResourceSummaryBase,
} from '@cloudrock/resource/summary';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { SlurmAllocationSummaryExtraDetails } from '@cloudrock/slurm/details/SlurmAllocationSummaryExtraDetails';

const formatQuota = (translate, usage, limit) =>
  translate('{usage} of {limit}', { usage, limit });

const formatCPU = (props) => {
  const usage = minutesToHours(props.resource.cpu_usage);
  const limit = minutesToHours(props.resource.cpu_limit);
  return formatQuota(props.translate, usage, limit);
};

const formatGPU = (props) => {
  const usage = minutesToHours(props.resource.gpu_usage);
  const limit = minutesToHours(props.resource.gpu_limit);
  return formatQuota(props.translate, usage, limit);
};

const convertRamToGbH = (value: number): string =>
  `${Math.ceil(value / 1024 / 60)} GB-h`;

const formatRAM = (props) => {
  const usage = convertRamToGbH(props.resource.ram_usage);
  const limit = convertRamToGbH(props.resource.ram_limit);
  return formatQuota(props.translate, usage, limit);
};

const PureSlurmAllocationSummary = (props: ResourceSummaryProps) => {
  const { translate } = props;
  return (
    <>
      <ResourceDetailsTable>
        <PureResourceSummaryBase {...props} />
        <Field
          label={translate('CPU')}
          value={formatCPU(props)}
          helpText={translate('Total CPU hours consumed this month')}
        />
        <Field
          label={translate('GPU')}
          value={formatGPU(props)}
          helpText={translate('Total GPU hours consumed this month')}
        />
        <Field
          label={translate('RAM')}
          value={formatRAM(props)}
          helpText={translate('Total RAM GB-hours consumed this month')}
        />
      </ResourceDetailsTable>
      <SlurmAllocationSummaryExtraDetails resource={props.resource} />
    </>
  );
};

export const SlurmAllocationSummary = withTranslation(
  PureSlurmAllocationSummary,
);
