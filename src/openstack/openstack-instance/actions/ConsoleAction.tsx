import { getInstanceConsoleUrl } from '@cloudrock/openstack/api';
import { validatePermissionsForConsoleAction } from '@cloudrock/openstack/utils';
import { validateState } from '@cloudrock/resource/actions/base';
import { OpenConsoleActionItem } from '@cloudrock/resource/actions/OpenConsoleActionItem';

const validators = [validateState('OK'), validatePermissionsForConsoleAction];

export const ConsoleAction = ({ resource }) => (
  <OpenConsoleActionItem
    apiMethod={getInstanceConsoleUrl}
    validators={validators}
    resource={resource}
  />
);
