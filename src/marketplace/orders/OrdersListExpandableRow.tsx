import { FunctionComponent } from 'react';

import { SupportOrderItemsTable } from '@cloudrock/marketplace/orders/item/list/SupportOrderItemsTable';

export const OrdersListExpandableRow: FunctionComponent<any> = ({ row }) => (
  <SupportOrderItemsTable order={row} />
);
