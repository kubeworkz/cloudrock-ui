import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { ResourceDetailsPage } from '@cloudrock/marketplace/resources/ResourceDetailsPage';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const ResourceDetailsPageForServiceProvider: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  useSidebarKey('public-resources');
  return <ResourceDetailsPage customer={customer} />;
};
