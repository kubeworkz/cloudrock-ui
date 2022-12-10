import { startVirtualMachine } from '@cloudrock/azure/api';
import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';

const validators = [validateState('OK'), validateRuntimeState('stopped')];

export const StartAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Start')}
    resource={resource}
    validators={validators}
    apiMethod={startVirtualMachine}
  />
);
