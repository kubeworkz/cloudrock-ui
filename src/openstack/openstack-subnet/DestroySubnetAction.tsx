import { destroySubnet } from '@cloudrock/openstack/api';
import { validateState } from '@cloudrock/resource/actions/base';
import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

const validators = [validateState('OK', 'Erred')];

export const DestroySubnetAction = ({ resource }) => (
  <DestroyActionItem
    validators={validators}
    resource={resource}
    apiMethod={destroySubnet}
  />
);
