import { getNodeConsoleUrl } from '@cloudrock/rancher/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { OpenConsoleLogActionItem } from '@cloudrock/resource/actions/OpenConsoleLogActionItem';

const validators = [validateState('OK')];

export const ConsoleLogAction = ({ resource }) => (
  <OpenConsoleLogActionItem
    apiMethod={getNodeConsoleUrl}
    validators={validators}
    resource={resource}
  />
);
