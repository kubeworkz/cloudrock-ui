import { FunctionComponent } from 'react';

import { translate } from '@cloudrock/i18n';
import { Report } from '@cloudrock/marketplace/resources/types';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { ShowReportComponent } from './ShowReportComponent';

interface ShowReportDialogProps {
  resolve: {
    report: Report;
  };
}

export const ShowReportDialog: FunctionComponent<ShowReportDialogProps> = (
  props,
) => (
  <ModalDialog
    title={translate('Report details')}
    footer={<CloseDialogButton />}
  >
    <ShowReportComponent report={props.resolve.report} />
  </ModalDialog>
);
