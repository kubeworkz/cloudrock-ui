import { translate } from '@cloudrock/i18n';
import { deactivateSnapshotSchedule } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';

const validators = [
  ({ resource }) => {
    if (!resource.is_active) {
      return translate('Resource schedule is already deactivated.');
    }
  },
];

export const DeactivateSnapshotScheduleAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Deactivate')}
    apiMethod={deactivateSnapshotSchedule}
    resource={resource}
    validators={validators}
  />
);
