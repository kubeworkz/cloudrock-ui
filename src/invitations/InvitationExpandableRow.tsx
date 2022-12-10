import React from 'react';

import { CopyToClipboardContainer } from '@cloudrock/core/CopyToClipboardContainer';
import { translate } from '@cloudrock/i18n';

export const InvitationExpandableRow: React.FC<{
  row;
}> = ({ row }) => (
  <>
    <p>
      <b>{translate('Invitation link')}: </b>
      <CopyToClipboardContainer
        value={`${location.origin}/invitation/${row.uuid}/`}
      />
    </p>
    {row.civil_number ? (
      <p>
        <b>{translate('Civil number')}: </b>
        {row.civil_number}
      </p>
    ) : null}
  </>
);
