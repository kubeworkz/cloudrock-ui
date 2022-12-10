import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';

export const DownloadInvoiceButton: FunctionComponent<{ invoice }> = ({
  invoice,
}) => (
  <a
    className="btn btn-default btn-sm"
    download={`invoice-${invoice.number}.pdf`}
    href={invoice.pdf}
    target="_self"
  >
    <i className="fa fa-download" /> {translate('Download invoice')}
  </a>
);
