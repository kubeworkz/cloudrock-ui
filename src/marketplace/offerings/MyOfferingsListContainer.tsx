import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { getOrganizationWorkspaceBreadcrumb } from '@cloudrock/navigation/breadcrumbs/utils';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { MyOfferingsList } from './MyOfferingsList';
import { OfferingsFilter as MyOfferingsFilter } from './OfferingsFilter';

export const MyOfferingsListContainer: FunctionComponent = () => {
  useBreadcrumbsFn(getOrganizationWorkspaceBreadcrumb, []);
  useTitle(translate('My offerings'));
  useSidebarKey('marketplace-services');
  return (
    <div className="ibox-content">
      <MyOfferingsFilter />
      <MyOfferingsList />
    </div>
  );
};
