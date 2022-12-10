import { restartVirtualMachine } from '@cloudrock/azure/api';
import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateState,
  validateRuntimeState,
} from '@cloudrock/resource/actions/base';

const validators = [validateState('OK'), validateRuntimeState('running')];

export const RestartAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Restart')}
    resource={resource}
    validators={validators}
    apiMethod={restartVirtualMachine}
  />
);
