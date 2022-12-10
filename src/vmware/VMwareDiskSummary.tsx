import { formatFilesize } from '@cloudrock/core/utils';
import { withTranslation } from '@cloudrock/i18n';
import { Field, PureResourceSummaryBase } from '@cloudrock/resource/summary';

const PureVMwareDiskSummary = (props) => {
  const { translate, resource } = props;
  return (
    <>
      <PureResourceSummaryBase {...props} />
      <Field label={translate('Size')} value={formatFilesize(resource.size)} />
    </>
  );
};

export const VMwareDiskSummary = withTranslation(PureVMwareDiskSummary);
