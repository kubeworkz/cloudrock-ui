import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { getAll } from '@cloudrock/core/api';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { createNameField } from '@cloudrock/resource/actions/base';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

import { createPort } from '../api';

export const CreatePortDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();

  const asyncState = useAsync(async () => {
    const params = {
      customer_pair_uuid: resource.customer_uuid,
      settings_uuid: resource.settings_uuid,
    };
    const networks = await getAll<any>('/vmware-networks/', { params });
    return {
      networks: networks.map((network) => ({
        value: network.url,
        label: network.name,
      })),
    };
  });

  const fields = asyncState.value
    ? [
        createNameField(),
        {
          name: 'network',
          label: translate('Network'),
          type: 'select',
          required: true,
          options: asyncState.value.networks,
        },
      ]
    : [];

  return (
    <ResourceActionDialog
      dialogTitle={translate('Create port')}
      formFields={fields}
      submitForm={async (formData) => {
        try {
          await createPort(resource.uuid, {
            name: formData.name,
            network: formData.network.value,
          });
          dispatch(showSuccess(translate('Port has been created.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showErrorResponse(e, translate('Unable to create port.')));
        }
      }}
    />
  );
};
