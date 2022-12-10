import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullSubnet } from '../api';

export const PullSubnetAction = ({ resource }) => (
  <PullActionItem apiMethod={pullSubnet} resource={resource} />
);
