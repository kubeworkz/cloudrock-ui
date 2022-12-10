import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullNetwork } from '../../api';

export const PullNetworkAction = ({ resource }) => (
  <PullActionItem apiMethod={pullNetwork} resource={resource} />
);
