import { useDispatch } from 'react-redux';

import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { restoreSnapshot } from '@cloudrock/openstack/api';
import {
  createLatinNameField,
  createDescriptionField,
} from '@cloudrock/resource/actions/base';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const RestoreSnapshotDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate('Restore volume snapshot')}
      formFields={[createLatinNameField(), createDescriptionField()]}
      initialValues={{
        mtu: resource.mtu,
      }}
      submitForm={async (formData) => {
        try {
          await restoreSnapshot(resource.uuid, formData);
          dispatch(
            showSuccess(translate('Volume snapshot has been restored.')),
          );
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to restore volume snapshot.'),
            ),
          );
        }
      }}
    />
  );
};
