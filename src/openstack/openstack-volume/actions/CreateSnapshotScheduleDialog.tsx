import { useDispatch } from 'react-redux';

import { getDefaultTimezone } from '@cloudrock/form/TimezoneField';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { createSnapshotSchedule } from '@cloudrock/openstack/api';
import { getFields } from '@cloudrock/openstack/openstack-backup-schedule/actions/fields';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const CreateSnapshotScheduleDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate('Create snapshot schedule for OpenStack volume')}
      formFields={getFields()}
      initialValues={{
        timezone: getDefaultTimezone(),
        schedule: '0 * * * *',
        retention_time: 0,
        maximal_number_of_resources: 0,
      }}
      submitForm={async (formData) => {
        try {
          await createSnapshotSchedule(resource.uuid, formData);
          dispatch(
            showSuccess(
              translate('Snapshot schedule for volume has been created.'),
            ),
          );
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to create snapshot schedule.'),
            ),
          );
        }
      }}
    />
  );
};
