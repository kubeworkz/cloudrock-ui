import React from 'react';
import { useDispatch } from 'react-redux';

import { Panel } from '@cloudrock/core/Panel';
import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { getOrganizationWorkspaceBreadcrumb } from '@cloudrock/navigation/breadcrumbs/utils';
import { useSidebarKey } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';
import { router } from '@cloudrock/router';

import { setOrderStateFilter } from '../../store/actions';

import { MyOrderItemsFilter } from './MyOrderItemsFilter';
import { MyOrderItemsList } from './MyOrderItemsList';
import { getOrderStateFilterOption } from './OrderStateFilter';

interface StateOptions {
  value: string;
  label: string;
}

interface MyOrderItemsContainerProps {
  setOrderStateFilter: (arg: StateOptions) => void;
}

export const MyOrderItemsContainer: React.FC<MyOrderItemsContainerProps> =
  () => {
    useBreadcrumbsFn(getOrganizationWorkspaceBreadcrumb, []);
    useTitle(translate('My orders'));
    useSidebarKey('marketplace-services');
    const dispatch = useDispatch();
    const filterOptions = getOrderStateFilterOption();
    React.useEffect(() => {
      const { filterState } = router.globals.params;
      if (filterState) {
        const filterOption = filterOptions.find(
          (op) => op.value === filterState,
        );
        if (filterOption) {
          dispatch(setOrderStateFilter('MyOrderItemsFilter', filterOption));
        }
      }
    }, [filterOptions, dispatch]);

    return (
      <Panel>
        <MyOrderItemsFilter />
        <MyOrderItemsList />
      </Panel>
    );
  };
