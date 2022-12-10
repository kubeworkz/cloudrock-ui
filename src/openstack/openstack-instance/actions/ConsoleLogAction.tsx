import { getInstanceConsoleLog } from '@cloudrock/openstack/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { OpenConsoleLogActionItem } from '@cloudrock/resource/actions/OpenConsoleLogActionItem';

const validators = [validateState('OK')];

export const ConsoleLogAction = ({ resource }) => (
  <OpenConsoleLogActionItem
    apiMethod={getInstanceConsoleLog}
    validators={validators}
    resource={resource}
  />
);
