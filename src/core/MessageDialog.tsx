import { FunctionComponent, ReactNode } from 'react';

import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface MessageDialogProps {
  resolve: {
    title: ReactNode;
    message: ReactNode;
  };
}

export const MessageDialog: FunctionComponent<MessageDialogProps> = (props) => (
  <ModalDialog title={props.resolve.title} footer={<CloseDialogButton />}>
    {props.resolve.message}
  </ModalDialog>
);
