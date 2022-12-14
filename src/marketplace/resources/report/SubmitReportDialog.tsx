import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { submitReport } from '@cloudrock/marketplace/common/api';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

export const SubmitReportDialog = ({
  resolve: { resource, reInitResource },
}) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      submitForm={async (formData) => {
        try {
          await submitReport(resource.uuid, {
            report: formData.report ? JSON.parse(formData.report) : undefined,
          });
          dispatch(showSuccess(translate('Report has been submitted')));
          if (reInitResource) {
            await reInitResource();
          }
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showErrorResponse(e, translate('Unable to submit report.')));
        }
      }}
      dialogTitle={translate('Submit report')}
      formFields={[
        {
          name: 'report',
          label: translate('Report'),
          help_text: translate(
            'Example: [{"header": "Database instance info", "body": "data"}]',
          ),
          required: false,
          type: 'json',
        },
      ]}
      initialValues={{
        report: resource.report ? JSON.stringify(resource.report) : '',
      }}
    />
  );
};
