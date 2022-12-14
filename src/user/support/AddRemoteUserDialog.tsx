import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { addRemoteUser } from './api';

export const AddRemoteUserDialog = ({ resolve: { refreshList } }) => {
  const dispatch = useDispatch();
  const context = {
    provider: ENV.plugins.CLOUDROCK_AUTH_SOCIAL.EDUTEAMS_LABEL,
  };
  return (
    <ResourceActionDialog
      dialogTitle={translate('Add {provider} user', context)}
      formFields={[
        {
          name: 'cuid',
          label: translate('Remote user ID'),
          required: true,
          type: 'string',
        },
      ]}
      submitForm={async (formData) => {
        try {
          await addRemoteUser(formData.cuid);
          dispatch(
            showSuccess(
              translate(
                '{provider} user has been successfully added.',
                context,
              ),
            ),
          );
          if (refreshList) {
            await refreshList();
          }
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to add {provider} user.', context),
            ),
          );
        }
      }}
    />
  );
};
