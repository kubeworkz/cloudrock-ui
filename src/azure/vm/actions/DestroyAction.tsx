import { destroyVirtualMachine } from '@cloudrock/azure/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

const validators = [validateState('OK', 'Erred')];

export const DestroyAction = ({ resource }) => (
  <DestroyActionItem
    resource={resource}
    validators={validators}
    apiMethod={destroyVirtualMachine}
  />
);
