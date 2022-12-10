import { FunctionComponent } from 'react';

import { OrganizationDetails } from '@cloudrock/customer/list/OrganizationDetails';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';
import { Customer } from '@cloudrock/workspace/types';

interface PureOrganizationDetailsDialogProps {
  resolve: {
    customer: Customer;
  };
}

export const OrganizationDetailsDialog: FunctionComponent<PureOrganizationDetailsDialogProps> =
  (props) => (
    <ModalDialog
      title={translate('Organization details')}
      footer={<CloseDialogButton />}
    >
      <OrganizationDetails customer={props.resolve.customer} />
    </ModalDialog>
  );
