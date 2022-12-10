import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import {
  createLatinNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { createNetwork } from '../../api';

export const CreateNetworkDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate('Create network for OpenStack tenant')}
      formFields={[createLatinNameField(), createDescriptionField()]}
      submitForm={async (formData) => {
        try {
          await createNetwork(resource.uuid, formData);
          dispatch(
            showSuccess(translate('OpenStack networks has been created.')),
          );
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to create OpenStack networks.'),
            ),
          );
        }
      }}
    />
  );
};
