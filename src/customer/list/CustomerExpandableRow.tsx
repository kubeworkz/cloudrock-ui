import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';
import { formValueSelector } from 'redux-form';

import { ENV } from '@cloudrock/configs/default';
import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { AgreementInfo } from '@cloudrock/invoices/list/AgreementInfo';
import { InvoicesStatsList } from '@cloudrock/invoices/list/InvoicesStatsList';
import { RootState } from '@cloudrock/store/reducers';

import { getInvoice } from './api';

export const CustomerExpandableRow = memo((props: any) => {
  const accountingPeriod = useSelector((state: RootState) =>
    formValueSelector('customerListFilter')(state, 'accounting_period'),
  );
  const invoiceUrl = `${ENV.apiEndpoint}api/customers/${props.row.uuid}/`;
  const { loading, error, value } = useAsync(
    () => getInvoice(invoiceUrl, accountingPeriod.value),
    [props.row, accountingPeriod],
  );
  if (loading) {
    return <LoadingSpinner />;
  } else if (error) {
    return <>{translate('Unable to load organization resources.')}</>;
  } else {
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '5px',
          }}
        >
          <AgreementInfo paymentProfiles={props.row.payment_profiles} />
        </div>
        {value ? (
          <InvoicesStatsList
            organization={props.row}
            invoiceUuid={value.uuid}
          />
        ) : (
          <p className="text-center">
            {translate('No invoice data available.')}
          </p>
        )}
      </>
    );
  }
});
