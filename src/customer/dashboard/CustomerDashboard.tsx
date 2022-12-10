import { FunctionComponent, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Panel } from '@cloudrock/core/Panel';
import { CustomerBookingManagement } from '@cloudrock/customer/dashboard/CustomerBookingManagement';
import { CategoryResourcesList } from '@cloudrock/dashboard/CategoryResourcesList';
import { DashboardHeader } from '@cloudrock/dashboard/DashboardHeader';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { CustomerChecklistOverview } from '@cloudrock/marketplace-checklist/CustomerChecklistOverview';
import { CustomerResourcesFilter } from '@cloudrock/marketplace/resources/list/CustomerResourcesFilter';
import { useTitle } from '@cloudrock/navigation/title';
import {
  getUser,
  getCustomer,
  checkIsServiceManager,
} from '@cloudrock/workspace/selectors';
import { ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

import { CustomerDashboardChart } from './CustomerDashboardChart';
import { CustomerResourcesList } from './CustomerResourcesList';

export const CustomerDashboard: FunctionComponent = () => {
  useTitle(translate('Dashboard'));

  const user = useSelector(getUser);
  const customer = useSelector(getCustomer);
  const isServiceManager = useMemo(
    () => checkIsServiceManager(customer, user),
    [customer, user],
  );

  return (
    <>
      <DashboardHeader
        title={translate('Welcome, {user}!', { user: user.full_name })}
        subtitle={translate('Overview of {organization} organization', {
          organization: customer.name,
        })}
      />
      {isServiceManager ? (
        <CustomerBookingManagement />
      ) : (
        <>
          <CustomerDashboardChart customer={customer} user={user} />
          <CustomerChecklistOverview customer={customer} />
          <CustomerBookingManagement />
          <Panel title={translate('Resources')}>
            <CustomerResourcesFilter />
            <CustomerResourcesList />
          </Panel>
          {isFeatureVisible('customer.category_resources_list') && (
            <CategoryResourcesList
              scopeType={ORGANIZATION_WORKSPACE}
              scope={customer}
            />
          )}
        </>
      )}
    </>
  );
};
