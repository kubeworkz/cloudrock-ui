import { useCurrentStateAndParams, useRouter } from '@uirouter/react';
import { useEffect, FunctionComponent, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncFn } from 'react-use';

import { ENV } from '@cloudrock/configs/default';
import { getById } from '@cloudrock/core/api';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { translate } from '@cloudrock/i18n';
import { useBreadcrumbsFn } from '@cloudrock/navigation/breadcrumbs/store';
import { BreadcrumbItem } from '@cloudrock/navigation/breadcrumbs/types';
import { LayoutContext } from '@cloudrock/navigation/context';
import { useTitle } from '@cloudrock/navigation/title';
import { showError, showSuccess } from '@cloudrock/store/notify';
import { getCustomer as getCustomerSelector } from '@cloudrock/workspace/selectors';

import { Invoice } from '../types';
import { formatPeriod } from '../utils';

import { BillingRecordDetails } from './BillingRecordDetails';
import { InvoiceDetailActions } from './InvoiceDetailActions';
import { InvoiceDetails } from './InvoiceDetails';

import './BillingDetails.scss';

const getBreadcrumbs = (customer, invoice): BreadcrumbItem[] => {
  return [
    {
      label: translate('Organization workspace'),
      state: 'organization.details',
      params: {
        uuid: customer.uuid,
      },
    },
    {
      label:
        ENV.accountingMode === 'accounting'
          ? translate('Accounting records')
          : translate('Invoices list'),
      state: 'organization.billing',
      params: {
        uuid: customer.uuid,
      },
    },
    {
      label: formatPeriod(invoice),
    },
  ];
};

const loadData = (invoiceId: string) => {
  if (isFeatureVisible('paypal')) {
    return getById<Invoice>('/paypal-invoices/', invoiceId);
  } else {
    return getById<Invoice>('/invoices/', invoiceId);
  }
};

export const BillingDetails: FunctionComponent = () => {
  useTitle(
    ENV.accountingMode === 'accounting'
      ? translate('Accounting record')
      : translate('Invoice'),
  );

  const router = useRouter();
  const {
    params: { invoice_uuid: invoiceId, status },
  } = useCurrentStateAndParams();

  const [{ loading, error, value: invoice }, callback] = useAsyncFn(
    () => loadData(invoiceId),
    [invoiceId],
  );

  useEffect(() => {
    if (!invoiceId) {
      router.stateService.go('errorPage.notFound');
    } else {
      callback();
    }
  }, [invoiceId, router.stateService, callback]);

  useEffect(() => {
    if ((error as any)?.status === 404) {
      router.stateService.go('errorPage.notFound');
    }
  }, [error, router.stateService]);

  const customer = useSelector(getCustomerSelector);
  useBreadcrumbsFn(
    () => (customer && invoice ? getBreadcrumbs(customer, invoice) : []),
    [customer, invoice],
  );

  const layoutContext = useContext(LayoutContext);
  useEffect(() => {
    layoutContext.setActions(<InvoiceDetailActions invoice={invoice} />);
    layoutContext.setSidebarClass('hidden-print');
    return () => {
      layoutContext.setActions(null);
      layoutContext.setSidebarClass('');
    };
  }, [invoice, layoutContext]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(showSuccess(translate('Payment succeeded.')));
    } else if (status === 'failed') {
      dispatch(showError(translate('Payment failed.')));
    } else if (status === 'skipped') {
      dispatch(showSuccess(translate('Payment has already been done.')));
    }
  }, [status, dispatch]);

  return loading ? (
    <LoadingSpinner />
  ) : error ? (
    <>{translate('Unable to load data.')}</>
  ) : !invoice ? null : ENV.accountingMode === 'accounting' ? (
    <BillingRecordDetails invoice={invoice} refreshInvoiceItems={callback} />
  ) : (
    <InvoiceDetails invoice={invoice} refreshInvoiceItems={callback} />
  );
};
