import { translate } from '@cloudrock/i18n';
import { updateSnapshotSchedule } from '@cloudrock/openstack/api';
import { getFields } from '@cloudrock/openstack/openstack-backup-schedule/actions/fields';
import { UpdateResourceDialog } from '@cloudrock/resource/actions/UpdateResourceDialog';

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
      updateResource={updateSnapshotSchedule}
      verboseName={translate('volume snapshot schedule')}
    />
  );
};
