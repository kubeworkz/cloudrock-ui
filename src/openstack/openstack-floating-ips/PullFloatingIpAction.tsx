import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullFloatingIP } from '../api';

export const PullFloatingIpAction = ({ resource }) => (
  <PullActionItem apiMethod={pullFloatingIP} resource={resource} />
);
