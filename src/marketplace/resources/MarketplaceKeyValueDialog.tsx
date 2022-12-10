import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { KeyValueTable } from './KeyValueTable';

export const MarketplaceKeyValueDialog: FunctionComponent<any> = (props) => {
  return (
    <ModalDialog
      title={translate('Request details')}
      footer={<CloseDialogButton />}
    >
      <KeyValueTable items={props.resolve.items} />
    </ModalDialog>
  );
};
