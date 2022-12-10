import { useDispatch } from 'react-redux';

import { getDefaultTimezone } from '@cloudrock/form/TimezoneField';
import { translate } from '@cloudrock/i18n';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { createBackupSchedule } from '@cloudrock/openstack/api';
import { getFields } from '@cloudrock/openstack/openstack-backup-schedule/actions/fields';
import { ResourceActionDialog } from '@cloudrock/resource/actions/ResourceActionDialog';
import { showSuccess, showErrorResponse } from '@cloudrock/store/notify';

export const CreateBackupScheduleDialog = ({ resolve: { resource } }) => {
  const dispatch = useDispatch();
  return (
    <ResourceActionDialog
      dialogTitle={translate(
        'Create VM snapshot schedule for OpenStack instance',
      )}
      formFields={getFields()}
      initialValues={{
        timezone: getDefaultTimezone(),
        schedule: '0 * * * *',
        retention_time: 0,
        maximal_number_of_resources: 0,
      }}
      submitForm={async (formData) => {
        try {
          await createBackupSchedule(resource.uuid, formData);
          dispatch(
            showSuccess(translate('VM snapshot schedule has been created.')),
          );
          dispatch(closeModalDialog());
        } catch (e) {
          dispatch(
            showErrorResponse(
              e,
              translate('Unable to create VM snapshot schedule.'),
            ),
          );
        }
      }}
    />
  );
};
