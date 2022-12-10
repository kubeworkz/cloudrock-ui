import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullDisk } from '../api';

export const PullDiskAction = ({ resource }) => (
  <PullActionItem apiMethod={pullDisk} resource={resource} />
);
