import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { OrderItemDetailsField } from '@cloudrock/marketplace/orders/item/details/OrderItemDetailsField';
import { SecretValueField } from '@cloudrock/marketplace/SecretValueField';
import { OrderItemDetailsProps } from '@cloudrock/marketplace/types';
import { BooleanField } from '@cloudrock/table/BooleanField';

export const OpenStackPackageDetails: FunctionComponent<OrderItemDetailsProps> =
  ({ orderItem: { attributes } }) => (
    <>
      {ENV.plugins.CLOUDROCK_OPENSTACK.TENANT_CREDENTIALS_VISIBLE && (
        <>
          <OrderItemDetailsField label={translate('Initial admin username')}>
            {attributes.user_username || translate('Auto-generated')}
          </OrderItemDetailsField>
          <OrderItemDetailsField label={translate('Initial admin password')}>
            {attributes.user_password ? (
              <SecretValueField
                className="max-w-300"
                value={attributes.user_password}
              />
            ) : (
              translate('Auto-generated')
            )}
          </OrderItemDetailsField>
        </>
      )}
      {attributes.subnet_cidr && (
        <OrderItemDetailsField
          label={translate('Internal network mask (CIDR)')}
        >
          {attributes.subnet_cidr}
        </OrderItemDetailsField>
      )}
      <OrderItemDetailsField
        label={translate('Skip connection to external network')}
      >
        <BooleanField value={attributes.skip_connection_extnet} />
      </OrderItemDetailsField>
    </>
  );
