import { translate } from '@cloudrock/i18n';
import { activateBackupSchedule } from '@cloudrock/openstack/api';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';

const validators = [
  ({ resource }) => {
    if (resource.is_active) {
      return translate('Resource schedule is already activated.');
    }
  },
];

export const ActivateAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Activate')}
    apiMethod={activateBackupSchedule}
    resource={resource}
    validators={validators}
  />
);
