import { FunctionComponent } from 'react';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  MenuItem,
} from 'react-bootstrap';

import { Tooltip } from '@cloudrock/core/Tooltip';
import { translate } from '@cloudrock/i18n';

export const InvoiceActions: FunctionComponent<{ invoice }> = ({ invoice }) =>
  invoice.backend_id ? (
    <Dropdown id="InvoiceActions">
      <DropdownToggle className="btn-sm">{translate('Actions')}</DropdownToggle>
      <DropdownMenu>
        {invoice.pdf ? (
          <MenuItem>
            <a
              download={`invoice-${invoice.number}.pdf`}
              href={invoice.pdf}
              target="_self"
            >
              <i className="fa fa-download"></i> {translate('Download invoice')}
            </a>
          </MenuItem>
        ) : null}
        <MenuItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={invoice.payment_url}
          >
            <i className="fa fa-paypal"></i> {translate('Pay invoice')}
          </a>
        </MenuItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Tooltip
      label={translate('Invoice has not been sent to PayPal yet')}
      id="paypal-tooltip"
    >
      N/A
    </Tooltip>
  );
