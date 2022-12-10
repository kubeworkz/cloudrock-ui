import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { getPublicServices } from '@cloudrock/marketplace/sidebar';
import { Sidebar } from '@cloudrock/navigation/sidebar/Sidebar';
import { SidebarMenuProps } from '@cloudrock/navigation/sidebar/types';
import { mergeItems, getCounterFields } from '@cloudrock/navigation/sidebar/utils';
import {
  checkIsServiceManager,
  getCustomer,
  getUser,
} from '@cloudrock/workspace/selectors';

import {
  getSidebarItems,
  getCustomerCounters,
  getExtraSidebarItems,
  getDashboardItem,
} from './utils';

export const CustomerSidebar: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  const user = useSelector(getUser);

  const { value } = useAsync<SidebarMenuProps>(async () => {
    if (!customer) {
      throw 404;
    }
    if (checkIsServiceManager(customer, user) && !user.is_staff) {
      return {
        items: [
          getDashboardItem(customer.uuid),
          getPublicServices(customer.uuid),
        ],
      };
    }
    const sidebarItems = getSidebarItems(customer).filter(Boolean);
    const extraItems = await getExtraSidebarItems();
    const items = mergeItems(sidebarItems, extraItems);
    const fields = getCounterFields(items);
    const counters = await getCustomerCounters(customer, fields);
    return { items, counters };
  }, [customer, user]);

  return <Sidebar items={value?.items} counters={value?.counters} />;
};
