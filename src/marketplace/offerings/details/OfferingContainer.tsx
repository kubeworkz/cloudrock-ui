import { useCurrentStateAndParams } from '@uirouter/react';
import { FunctionComponent } from 'react';
import { useAsyncFn, useEffectOnce } from 'react-use';

import { OFFERING_TYPE_BOOKING } from '@cloudrock/booking/constants';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import {
  getProviderOffering,
  getCategory,
} from '@cloudrock/marketplace/common/api';
import { OfferingResourcesFilter } from '@cloudrock/marketplace/details/OfferingResourcesFilter';
import { OfferingResourcesList } from '@cloudrock/marketplace/details/OfferingResourcesList';
import { getTabs } from '@cloudrock/marketplace/details/OfferingTabs';
import { Offering } from '@cloudrock/marketplace/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';

import { OfferingBookingTab } from './OfferingBookingTab';
import { OfferingDetails } from './OfferingDetails';
import { OfferingUsersTab } from './OfferingUsersTab';
import { PlanUsageList } from './PlanUsageList';

function getBreadcrumbs(offering: Offering): BreadcrumbItem[] {
  return [
    {
      label: translate('Organization workspace'),
      state: 'organization.details',
    },
    {
      label: translate('My services'),
    },
    offering.shared
      ? {
          label: translate('Public offerings'),
          state: 'marketplace-vendor-offerings',
        }
      : {
          label: translate('My offerings'),
          state: 'marketplace-my-offerings',
        },
  ];
}

async function loadData(offering_uuid: string) {
  const offering = await getProviderOffering(offering_uuid);
  const category = await getCategory(offering.category_uuid);
  const sections = category.sections;

  const tabs = [
    ...getTabs({ offering, sections }),
    {
      visible: offering.billable,
      title: translate('Plan capacity'),
      component: () => <PlanUsageList offering_uuid={offering.uuid} />,
    },
    {
      title: translate('Bookings'),
      component: () => <OfferingBookingTab offeringUuid={offering.uuid} />,
      visible: offering.type === OFFERING_TYPE_BOOKING,
    },
    {
      visible: true,
      title: translate('Resources'),
      component: () => (
        <>
          <OfferingResourcesFilter />
          <OfferingResourcesList offering={offering} />
        </>
      ),
    },
    {
      visible: true,
      title: translate('Users'),
      component: () => <OfferingUsersTab offering={offering} />,
    },
  ].filter((tab) => tab.visible);
  return { offering, tabs };
}

export const OfferingContainer: FunctionComponent = () => {
  const {
    params: { offering_uuid },
  } = useCurrentStateAndParams();

  const [{ loading, error, value }, reInitResource] = useAsyncFn(
    () => loadData(offering_uuid),
    [offering_uuid],
  );

  useEffectOnce(() => {
    reInitResource();
  });

  useBreadcrumbsFn(
    () => (value ? getBreadcrumbs(value.offering) : []),
    [value],
  );

  useTitle(value ? value.offering.name : translate('Offering details'));

  useSidebarKey('marketplace-services');

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <h3>{translate('Unable to load offering details.')}</h3>;
  }

  if (!value) {
    return null;
  }

  return (
    <OfferingDetails
      offering={value.offering}
      tabs={value.tabs}
      reInitResource={reInitResource}
    />
  );
};
