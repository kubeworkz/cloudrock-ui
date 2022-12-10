import { translate } from '@cloudrock/i18n';
import { AsyncActionItem } from '@cloudrock/resource/actions/AsyncActionItem';
import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';

import { resetVirtualMachine } from '../api';

const validators = [validateState('OK'), validateRuntimeState('POWERED_ON')];

export const ResetAction = ({ resource }) => (
  <AsyncActionItem
    title={translate('Reset')}
    resource={resource}
    validators={validators}
    apiMethod={resetVirtualMachine}
  />
);
