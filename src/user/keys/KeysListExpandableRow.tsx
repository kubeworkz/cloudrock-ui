import { FunctionComponent } from 'react';

import { CopyToClipboardContainer } from '@cloudrock/core/CopyToClipboardContainer';
import { translate } from '@cloudrock/i18n';

export const KeysListExpandableRow: FunctionComponent<any> = ({ row }) =>
  row.public_key ? (
    <div className="container-fluid m-t">
      <p>
        <b className="m-r-sm">{translate('Public key')}:</b>
        <CopyToClipboardContainer
          value={row.public_key}
          label={row.public_key}
        />
      </p>
    </div>
  ) : null;
