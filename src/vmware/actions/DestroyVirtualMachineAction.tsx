import {
  validateRuntimeState,
  validateState,
} from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

import { destroyVirtualMachine } from '../api';

const validators = [
  validateState('OK', 'Erred'),
  validateRuntimeState('POWERED_OFF'),
];

export const DestroyVirtualMachineAction = ({ resource }) => (
  <DestroyActionItem
    validators={validators}
    resource={resource}
    apiMethod={destroyVirtualMachine}
  />
);
