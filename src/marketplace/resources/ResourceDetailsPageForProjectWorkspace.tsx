import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ResourceDetailsPage } from '@cloudrock/marketplace/resources/ResourceDetailsPage';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const ResourceDetailsPageForProjectWorkspace: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  return <ResourceDetailsPage customer={customer} />;
};
