import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { createDisk } from '../api';

export const CreateDiskDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate('Create disk')}
      formFields={[
        {
          label: translate('Size'),
          type: 'integer',
        },
      ]}
      submitForm={async (formData) => {
        try {
          await createDisk(resource.uuid, formData.size);
          dispatch(showSuccess(translate('Disk has been created.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showErrorResponse(e, translate('Unable to create disk.')));
        }
      }}
    />
  );
};
