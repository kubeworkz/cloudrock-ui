import { pullVolume } from '@cloudrock/openstack/api';
import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

export const PullAction = ({ resource }) => (
  <PullActionItem resource={resource} apiMethod={pullVolume} />
);
