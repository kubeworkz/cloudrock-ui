import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';

import { startVirtualMachine } from '../api';

const validators = [
  validateState('OK'),
  validateRuntimeState('POWERED_OFF', 'SUSPENDED'),
];

export const StartAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Start')}
    resource={resource}
    validators={validators}
    apiMethod={startVirtualMachine}
  />
);
