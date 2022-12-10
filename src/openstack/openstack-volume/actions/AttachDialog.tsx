import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { getAll } from '@cloudrock/core/api';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { attachVolume } from '@cloudrock/openstack/api';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { VirtualMachine } from '@cloudrock/resource/types';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const AttachDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();

  const asyncState = useAsync(async () => {
    const params = {
      attach_volume_uuid: resource.uuid,
      field: ['url', 'name'],
    };
    const instances = await getAll<VirtualMachine>(
      '/openstacktenant-instances/',
      { params },
    );
    return {
      instances: instances.map((choice) => ({
        value: choice.url,
        label: choice.name,
      })),
    };
  });

  const fields = asyncState.value
    ? [
        {
          name: 'instance',
          label: translate('Instance'),
          type: 'select',
          required: true,
          options: asyncState.value.instances,
        },
      ]
    : [];

  return (
    <ResourceActionDialog
      dialogTitle={translate('Attach OpenStack Volume to Instance')}
      formFields={fields}
      submitForm={async (formData) => {
        try {
          await attachVolume(resource.uuid, formData.instance);
          dispatch(
            showSuccess(translate('Volume has been attached to instance.')),
          );
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to attach volume to instance.'),
            ),
          );
        }
      }}
    />
  );
};
