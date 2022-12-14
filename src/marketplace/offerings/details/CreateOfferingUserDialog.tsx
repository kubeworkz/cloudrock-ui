import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { createOfferingUser } from '@cloudrock/marketplace/common/api';
import { userAutocomplete } from '@cloudrock/marketplace/common/autocompletes';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showErrorResponse, showSuccess } from '@cloudrock/store/notify';

export const CreateOfferingUserDialog = ({
  resolve: { offering, onSuccess },
}) => {
  const dispatch = useDispatch();
  const fields = [
    {
      name: 'user',
      label: translate('User'),
      type: 'async_select',
      loadOptions: userAutocomplete,
      getOptionLabel: ({ full_name }) => full_name,
    },
    {
      name: 'username',
      label: translate('Username'),
      type: 'string',
    },
  ];
  return (
    <ResourceActionDialog
      dialogTitle={translate('Create offering user')}
      formFields={fields}
      submitForm={async (formData) => {
        try {
          await createOfferingUser({
            offering: offering.url,
            user: formData.user.url,
            username: formData.username,
          });
          dispatch(showSuccess(translate('Offering user has been created.')));
          dispatch(closeModalDialog());
          onSuccess();
        } catch (e) {
          dispatch(
            showErrorResponse(e, translate('Unable to create offering user.')),
          );
        }
      }}
    />
  );
};
