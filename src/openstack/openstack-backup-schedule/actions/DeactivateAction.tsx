import { translate } from '@cloudrock/i18n';
import { deactivateBackupSchedule } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';

const validators = [
  ({ resource }) => {
    if (!resource.is_active) {
      return translate('Resource schedule is already deactivated.');
    }
  },
];

export const DeactivateAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Deactivate')}
    apiMethod={deactivateBackupSchedule}
    resource={resource}
    validators={validators}
  />
);
