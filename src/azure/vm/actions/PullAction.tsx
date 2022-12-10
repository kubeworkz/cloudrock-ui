import { pullVirtualMachine } from '@cloudrock/azure/api';
import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

export const PullAction = ({ resource }) => (
  <PullActionItem apiMethod={pullVirtualMachine} resource={resource} />
);
