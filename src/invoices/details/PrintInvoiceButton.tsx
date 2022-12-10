import { FunctionComponent } from 'react';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';

export const PrintInvoiceButton: FunctionComponent = () => (
  <button className="btn btn-default btn-sm" onClick={() => window.print()}>
    <i className="fa fa-print" />{' '}
    {ENV.accountingMode === 'accounting'
      ? translate('Print record')
      : translate('Print invoice')}
  </button>
);
