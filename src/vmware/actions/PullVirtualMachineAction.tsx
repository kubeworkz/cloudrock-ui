import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

import { pullVirtualMachine } from '../api';

export const PullVirtualMachineAction = ({ resource }) => (
  <PullActionItem apiMethod={pullVirtualMachine} resource={resource} />
);
