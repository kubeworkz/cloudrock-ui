import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullInstance } from '../../api';

export const PullInstanceAction = ({ resource }) => (
  <PullActionItem apiMethod={pullInstance} resource={resource} />
);
