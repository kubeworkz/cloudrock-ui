import { DestroyActionItem } from '@cloudrock/resource/actions/DestroyActionItem';

import { destroyServerGroup } from '../api';

export const DestroyServerGroupAction = ({ resource }) => (
  <DestroyActionItem apiMethod={destroyServerGroup} resource={resource} />
);
