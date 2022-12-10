import { withTranslation } from '@cloudrock/i18n';
import { Field, ResourceSummaryProps } from '@cloudrock/resource/summary';
import { PureScheduleSummary } from '@cloudrock/resource/summary/ScheduleSummary';
import { Schedule } from '@cloudrock/resource/types';

const PureOpenStackBackupScheduleSummary = (
  props: ResourceSummaryProps<Schedule>,
) => {
  const { translate, resource } = props;
  return (
    <>
      <PureScheduleSummary {...props} />
      <Field
        label={translate('Max # of VM snapshots')}
        value={resource.maximal_number_of_resources}
      />
    </>
  );
};

export const OpenStackBackupScheduleSummary = withTranslation(
  PureOpenStackBackupScheduleSummary,
);
