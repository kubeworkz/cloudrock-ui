import { pullTenant } from '@cloudrock/openstack/api';
import { PullActionItem } from '@cloudrock/resource/actions/PullActionItem';

export const PullTenantAction = ({ resource }) => (
  <PullActionItem apiMethod={pullTenant} resource={resource} />
);
