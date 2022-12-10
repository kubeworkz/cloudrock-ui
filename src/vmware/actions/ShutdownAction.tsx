import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';

import { shutdownVirtualMachine } from '../api';

const validators = [validateState('OK'), validateRuntimeState('POWERED_ON')];

export const ShutdownAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Shutdown')}
    resource={resource}
    validators={validators}
    apiMethod={shutdownVirtualMachine}
  />
);
