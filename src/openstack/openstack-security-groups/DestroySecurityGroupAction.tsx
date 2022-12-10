import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

import { destroySecurityGroup } from '../api';

export const DestroySecurityGroupAction = ({ resource }) =>
  resource.name !== 'default' ? (
    <DestroyActionItem resource={resource} apiMethod={destroySecurityGroup} />
  ) : null;
