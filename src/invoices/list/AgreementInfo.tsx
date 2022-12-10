import { FunctionComponent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffectOnce } from 'react-use';

import { formatDate } from '@cloudrock/core/dateUtils';
import { defaultCurrency } from '@cloudrock/core/formatCurrency';
import { getTotalOfSumPaid } from '@cloudrock/customer/payments/api';
import { translate } from '@cloudrock/i18n';
import { getActiveFixedPricePaymentProfile } from '@cloudrock/invoices/details/utils';
import { getCustomer } from '@cloudrock/workspace/selectors';
import { PaymentProfile } from '@cloudrock/workspace/types';

interface AgreementInfoProps {
  paymentProfiles?: PaymentProfile[];
}

export const AgreementInfo: FunctionComponent<AgreementInfoProps> = (props) => {
  const customer = useSelector(getCustomer);
  const activeFixedPricePaymentProfile = getActiveFixedPricePaymentProfile(
    customer ? customer.payment_profiles : props.paymentProfiles,
  );
  const [totalOfSumPaid, setTotalOfSumPaid] = useState();
  useEffectOnce(() => {
    if (activeFixedPricePaymentProfile) {
      (async () => {
        setTotalOfSumPaid(
          await getTotalOfSumPaid(activeFixedPricePaymentProfile.uuid),
        );
      })();
    }
  });
  return (
    <>
      {activeFixedPricePaymentProfile ? (
        <div style={{ marginBottom: '20px' }}>
          {activeFixedPricePaymentProfile.attributes.agreement_number ? (
            <>
              {translate('Organization has signed a fixed price agreement')}{' '}
              {activeFixedPricePaymentProfile.attributes.agreement_number}.
              {activeFixedPricePaymentProfile.attributes.end_date ? (
                <>
                  {' '}
                  {translate('End date of the agreement is {date}.', {
                    date: formatDate(
                      activeFixedPricePaymentProfile.attributes.end_date,
                    ),
                  })}
                </>
              ) : null}
              {activeFixedPricePaymentProfile.attributes.contract_sum ? (
                <>
                  {' '}
                  {translate('Contract sum is {sum}.', {
                    sum: defaultCurrency(
                      activeFixedPricePaymentProfile.attributes.contract_sum,
                    ),
                  })}{' '}
                </>
              ) : null}
              <>
                {' '}
                {translate('Total paid')}{' '}
                <span
                  style={
                    activeFixedPricePaymentProfile.attributes.contract_sum !==
                    totalOfSumPaid
                      ? {
                          color: 'red',
                          fontWeight: 'bold',
                        }
                      : null
                  }
                >
                  {defaultCurrency(totalOfSumPaid)}
                </span>
                .
              </>
            </>
          ) : null}
        </div>
      ) : null}
    </>
  );
};
