import { useDispatch } from 'react-redux';

import { FileUploadField } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { submitJob } from '@cloudrock/slurm/api';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const SubmitJobDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate('Submit job')}
      formFields={[
        {
          name: 'file',
          label: translate('Batch script file'),
          component: FileUploadField,
        },
      ]}
      submitForm={async (formData) => {
        try {
          await submitJob({
            name: 'job',
            file: formData.file,
            project: resource.project,
            service_settings: resource.service_settings,
          });
          dispatch(showSuccess(translate('Job has been submitted.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showErrorResponse(e, translate('Unable to submit job.')));
        }
      }}
    />
  );
};
