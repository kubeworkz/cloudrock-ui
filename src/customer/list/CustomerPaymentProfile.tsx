import { FunctionComponent } from 'react';

import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';
import { ResourceDetailsTable } from '@cloudrock/resource/summary/ResourceDetailsTable';
import { PaymentProfile } from '@cloudrock/workspace/types';

interface CustomerPaymentProfileProps {
  paymentProfiles: PaymentProfile[];
}

export const CustomerPaymentProfile: FunctionComponent<CustomerPaymentProfileProps> =
  (props) => {
    if (!props.paymentProfiles) {
      return null;
    }
    const activePaymentProfile = props.paymentProfiles.find(
      (element) => element.is_active,
    );
    return activePaymentProfile ? (
      <ResourceDetailsTable>
        <div className="m-b-xs m-t-sm ">
          <dt>{translate('Payment profile ')}</dt>
          <dd>
            <Tooltip
              label={translate('Payment type {type}', {
                type: activePaymentProfile.payment_type,
              })}
              id="fieldLabel"
            >
              {activePaymentProfile.name}
            </Tooltip>
          </dd>
        </div>
      </ResourceDetailsTable>
    ) : null;
  };
