import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { getOrganizationWorkspaceBreadcrumb } from '@cloudrock/navigation/breadcrumbs/utils';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { CustomerResourcesFilter } from './CustomerResourcesFilter';
import { CustomerResourcesList } from './CustomerResourcesList';

export const CustomerResourcesContainer: FunctionComponent = () => {
  useBreadcrumbsFn(getOrganizationWorkspaceBreadcrumb, []);
  useTitle(translate('My resources'));
  useSidebarKey('marketplace-services');
  return (
    <div className="ibox-content">
      <CustomerResourcesFilter />
      <CustomerResourcesList />
    </div>
  );
};
