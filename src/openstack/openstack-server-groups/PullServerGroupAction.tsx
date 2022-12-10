import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullServerGroup } from '../api';

export const PullServerGroupAction = ({ resource }) => (
  <PullActionItem apiMethod={pullServerGroup} resource={resource} />
);
