import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullSnapshot } from '../api';

export const PullSnapshotAction = ({ resource }) => (
  <PullActionItem apiMethod={pullSnapshot} resource={resource} />
);
