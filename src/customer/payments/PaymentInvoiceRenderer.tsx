import { FunctionComponent } from 'react';

import { Link } from '@cloudrock/core/Link';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';

export const PaymentInvoiceRenderer: FunctionComponent<{ row }> = ({ row }) =>
  row.invoice_uuid && row.invoice_period ? (
    <Link
      state="billingDetails"
      params={{ uuid: row.customer_uuid, invoice_uuid: row.invoice_uuid }}
    >
      {row.invoice_period}
    </Link>
  ) : (
    <>{DASH_ESCAPE_CODE}</>
  );
