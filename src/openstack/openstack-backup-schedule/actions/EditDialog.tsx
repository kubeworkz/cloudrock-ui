import { translate } from '@cloudrock/i18n';
import { updateBackupSchedule } from '@cloudrock/openstack/api';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

import { getFields } from './fields';

export const EditDialog = ({ resolve: { resource } }) => {
  return (
    <UpdateResourceDialog
      fields={getFields()}
      resource={resource}
      initialValues={{
        name: resource.name,
        description: resource.description,
        retention_time: resource.retention_time,
        timezone: resource.timezone,
        maximal_number_of_resources: resource.maximal_number_of_resources,
        schedule: resource.schedule,
      }}
      updateResource={updateBackupSchedule}
      verboseName={translate('VM snapshot schedule')}
    />
  );
};
