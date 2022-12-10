import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullPort } from '../api';

export const PullPortAction = ({ resource }) => (
  <PullActionItem apiMethod={pullPort} resource={resource} />
);
