import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OrderItemDetailsField } from '@cloudrock/marketplace/orders/item/details/OrderItemDetailsField';
import { SecretValueField } from '@cloudrock/marketplace/SecretValueField';
import { OrderItemDetailsProps } from '@cloudrock/marketplace/types';

export const AzureSQLServerDetails: FunctionComponent<OrderItemDetailsProps> = (
  props,
) => {
  const { attributes } = props.orderItem;
  return (
    <>
      <OrderItemDetailsField label={translate('Admin username')}>
        {attributes.username}
      </OrderItemDetailsField>
      <OrderItemDetailsField label={translate('Admin password')}>
        <SecretValueField className="max-w-300" value={attributes.password} />
      </OrderItemDetailsField>
    </>
  );
};
