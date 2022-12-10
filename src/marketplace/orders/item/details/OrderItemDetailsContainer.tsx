import { useCurrentStateAndParams } from '@uirouter/react';
import React, { useEffect, useState } from 'react';
import { useAsyncFn, useEffectOnce, useNetwork } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { Await } from '@cloudrock/core/types';
import { useRecursiveTimeout } from '@cloudrock/core/useRecursiveTimeout';
import { translate } from '@cloudrock/i18n';
import * as api from '@cloudrock/marketplace/common/api';
import { getTabs } from '@cloudrock/marketplace/details/OfferingTabs';
import { OfferingTabsComponent } from '@cloudrock/marketplace/details/OfferingTabsComponent';
import { OrderItemDetailsType } from '@cloudrock/marketplace/orders/types';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';
import store from '@cloudrock/store/store';
import { getWorkspace } from '@cloudrock/workspace/selectors';
import { ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

import { OrderItemDetails } from './OrderItemDetails';

function getBreadcrumbs(orderItem: OrderItemDetailsType): BreadcrumbItem[] {
  const workspace = getWorkspace(store.getState());
  if (workspace === ORGANIZATION_WORKSPACE) {
    return [
      {
        label: translate('Organization workspace'),
        state: 'organization.details',
      },
      {
        label: translate('My services'),
      },
      {
        label: translate('My orders'),
        state: 'marketplace-my-order-items',
        params: {
          uuid: orderItem.customer_uuid,
        },
      },
      {
        label: translate('Order details'),
        state: 'marketplace-order-details-customer',
        params: {
          order_uuid: orderItem.order_uuid,
        },
      },
    ];
  } else {
    return [
      {
        label: translate('Project workspace'),
        state: 'project.details',
      },
      {
        label: translate('My orders'),
        state: 'marketplace-order-list',
      },
      {
        label: translate('Order details'),
        state: 'marketplace-order-details',
        params: {
          order_uuid: orderItem.order_uuid,
        },
      },
    ];
  }
}

async function loadOrderItem(order_item_uuid) {
  const orderItem = await api.getOrderItem(order_item_uuid);
  const offering = await api.getOrderItemOffering(order_item_uuid);
  const plugins = await api.getPlugins();
  const limits = plugins.find(
    (plugin) => plugin.offering_type === offering.type,
  ).available_limits;
  const category = await api.getCategory(offering.category_uuid);
  const sections = category.sections;
  const tabs = getTabs({ offering, sections });
  return {
    orderItem,
    offering,
    tabs,
    limits,
  };
}

export const OrderItemDetailsContainer: React.FC = () => {
  const {
    params: { order_item_uuid },
  } = useCurrentStateAndParams();

  const [{ loading, value, error }, loadData] = useAsyncFn(
    () => loadOrderItem(order_item_uuid),
    [order_item_uuid],
  );

  useEffectOnce(() => {
    loadData();
  });

  const [asyncValue, setAsyncValue] =
    useState<Await<ReturnType<typeof loadData>>>();

  const { online } = useNetwork();

  // Refresh order item details until it is switched from pending state to terminal state
  const pullInterval =
    online && ['pending', 'executing'].includes(asyncValue?.orderItem.state)
      ? ENV.defaultPullInterval * 1000
      : null;
  useRecursiveTimeout(loadData, pullInterval);

  useEffect(() => {
    if (
      value &&
      (!asyncValue ||
        asyncValue.orderItem.modified !== value.orderItem.modified)
    ) {
      setAsyncValue(value);
    }
  }, [value, asyncValue]);

  useBreadcrumbsFn(
    () => (asyncValue ? getBreadcrumbs(asyncValue.orderItem) : []),
    [asyncValue],
  );

  useTitle(
    asyncValue
      ? asyncValue.orderItem.offering_name
      : translate('Order item details'),
  );

  useSidebarKey('marketplace-services');

  // Don't render loading indicator if order item is refreshing
  // since if it is in pending state it is refreshed via periodic polling
  if (asyncValue) {
    return (
      <>
        <OrderItemDetails {...asyncValue} loadData={loadData} />
        <OfferingTabsComponent tabs={asyncValue.tabs} />
      </>
    );
  }
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <h3>{translate('Unable to get order item.')}</h3>;
  }
  return null;
};
