import { useDispatch } from 'react-redux';
import { useAsync } from 'react-use';

import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { getInstances } from '@cloudrock/openstack/api';
import { linkInstance } from '@cloudrock/rancher/api';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const LinkDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();

  const asyncState = useAsync(async () => {
    const instances = await getInstances({
      project_uuid: resource.project_uuid,
      o: 'name',
    });

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
          type: 'select',
          required: true,
          label: translate('OpenStack instance'),
          options: asyncState.value.instances,
        },
      ]
    : [];

  return (
    <ResourceActionDialog
      dialogTitle={translate('Link OpenStack Instance')}
      formFields={fields}
      submitForm={async (formData) => {
        try {
          await linkInstance(resource.uuid, formData);
          dispatch(showSuccess(translate('Instance has been linked.')));
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(showErrorResponse(e, translate('Unable to link instance.')));
        }
      }}
    />
  );
};
