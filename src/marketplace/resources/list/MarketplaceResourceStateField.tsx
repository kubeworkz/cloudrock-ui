import { StateIndicator } from '@cloudrock/core/StateIndicator';

import { Resource } from '../types';

export const MarketplaceResourceStateField = ({
  resource,
}: {
  resource: Resource;
}) => (
  <StateIndicator
    label={resource.state}
    variant={
      resource.state === 'Erred'
        ? 'danger'
        : resource.state === 'Terminated'
        ? 'warning'
        : 'primary'
    }
    active={['Creating', 'Updating', 'Terminating'].includes(resource.state)}
  />
);
