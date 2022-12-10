import { validatePermissionsForConsoleAction } from '@cloudrock/openstack/utils';
import { getNodeConsoleUrl } from '@cloudrock/rancher/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { OpenConsoleActionItem } from '@cloudrock/resource/actions/OpenConsoleActionItem';

const validators = [validateState('OK'), validatePermissionsForConsoleAction];

export const ConsoleAction = ({ resource }) => (
  <OpenConsoleActionItem
    apiMethod={getNodeConsoleUrl}
    validators={validators}
    resource={resource}
  />
);
