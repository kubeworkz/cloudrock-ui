import { useCurrentStateAndParams } from '@uirouter/react';
import { triggerTransition } from '@uirouter/redux';
import { useState, useEffect, FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { Layout } from '@cloudrock/navigation/Layout';
import { getCustomer } from '@cloudrock/project/api';
import {
  setCurrentCustomer,
  setCurrentProject,
  setCurrentWorkspace,
} from '@cloudrock/workspace/actions';
import {
  checkCustomerUser,
  checkIsServiceManager,
  getCustomer as getCustomerSelector,
  getUser,
} from '@cloudrock/workspace/selectors';
import { ORGANIZATION_WORKSPACE } from '@cloudrock/workspace/types';

import { CustomerSidebar } from './CustomerSidebar';

function getBreadcrumbs(customer): BreadcrumbItem[] {
  if (customer) {
    return [
      {
        label: translate('Organization workspace'),
        state: 'organization.dashboard',
        params: {
          uuid: customer.uuid,
        },
      },
    ];
  }
}

export const CustomerWorkspace: FunctionComponent = () => {
  const [pageClass, setPageClass] = useState<string>();
  const [hideBreadcrumbs, setHideBreadcrumbs] = useState<boolean>();
  const customer = useSelector(getCustomerSelector);
  const currentUser = useSelector(getUser);
  const { state, params } = useCurrentStateAndParams();
  const customerId = params?.uuid;

  const dispatch = useDispatch();
  useAsync(async () => {
    if (!customerId) {
      dispatch(triggerTransition('errorPage.notFound', {}));
    } else {
      try {
        const currentCustomer = await getCustomer(customerId);
        dispatch(setCurrentCustomer(currentCustomer));
        dispatch(setCurrentProject(null));
        dispatch(setCurrentWorkspace(ORGANIZATION_WORKSPACE));

        if (
          !checkCustomerUser(currentCustomer, currentUser) &&
          !checkIsServiceManager(currentCustomer, currentUser) &&
          !currentUser.is_support
        ) {
          dispatch(triggerTransition('errorPage.notFound', {}));
        }
      } catch {
        dispatch(triggerTransition('errorPage.notFound', {}));
      }
    }
  }, [customerId]);

  function refreshState() {
    const data = state?.data;
    setPageClass(data?.pageClass);
    setHideBreadcrumbs(data?.hideBreadcrumbs);
  }

  useBreadcrumbsFn(() => getBreadcrumbs(customer), [customer]);

  useEffect(refreshState, [state, params]);

  return customer ? (
    <Layout
      sidebar={<CustomerSidebar />}
      pageClass={pageClass}
      hideBreadcrumbs={hideBreadcrumbs}
    />
  ) : null;
};
