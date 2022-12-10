import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';

import { stopVirtualMachine } from '../api';

const validators = [
  validateState('OK'),
  validateRuntimeState('POWERED_ON', 'SUSPENDED'),
];

export const StopAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Stop')}
    resource={resource}
    validators={validators}
    apiMethod={stopVirtualMachine}
  />
);
