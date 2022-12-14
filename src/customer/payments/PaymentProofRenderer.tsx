import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { DASH_ESCAPE_CODE } from '@cloudrock/table/constants';

export const PaymentProofRenderer: FunctionComponent<{ row }> = ({ row }) =>
  row.proof ? (
    <a href={row.proof} target="_blank" rel="noopener noreferrer">
      {translate('Proof document')} <i className="fa fa-external-link" />
    </a>
  ) : (
    <>{DASH_ESCAPE_CODE}</>
  );
