import { FunctionComponent } from 'react';

import { CUSTOMER_OWNER_ROLE } from '@cloudrock/core/constants';
import { BooleanField } from '@cloudrock/table/BooleanField';

interface CustomerRoleProps {
  row: {
    role: string;
  };
}

export const CustomerRole: FunctionComponent<CustomerRoleProps> = ({ row }) => (
  <BooleanField value={row.role === CUSTOMER_OWNER_ROLE} />
);
