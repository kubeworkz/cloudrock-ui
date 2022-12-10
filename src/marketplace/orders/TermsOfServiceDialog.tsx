import { FunctionComponent } from 'react';

import { FormattedHtml } from '@cloudrock/core/FormattedHtml';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface TermsOfServiceDialogProps {
  resolve: {
    content: string;
  };
}

export const TermsOfServiceDialog: FunctionComponent<TermsOfServiceDialogProps> =
  (props) => (
    <ModalDialog
      title={translate('Terms of Service')}
      footer={<CloseDialogButton />}
    >
      <FormattedHtml html={props.resolve.content} />
    </ModalDialog>
  );
