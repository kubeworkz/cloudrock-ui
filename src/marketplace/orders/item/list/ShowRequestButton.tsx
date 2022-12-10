import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { OrderDetailsLink } from '@cloudrock/marketplace/orders/OrderDetailsLink';

export const ShowRequestButton: FunctionComponent<{ row }> = ({ row }) => (
  <OrderDetailsLink
    order_uuid={row.order_uuid}
    customer_uuid={row.customer_uuid}
    project_uuid={row.project_uuid}
    className="btn btn-default btn-sm"
  >
    {translate('Show request')}
  </OrderDetailsLink>
);
