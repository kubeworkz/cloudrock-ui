import { destroyBackup } from '@cloudrock/openstack/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

const validators = [validateState('OK', 'Erred')];

export const DestroyBackupAction = ({ resource }) => (
  <DestroyActionItem
    validators={validators}
    resource={resource}
    apiMethod={destroyBackup}
  />
);
