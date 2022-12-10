import { FC } from 'react';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { SubmitButton } from '@cloudrock/form';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

interface AsyncActionDialogProps {
  title: string;
  loading: boolean;
  error: any;
  submitting: boolean;
  invalid: boolean;
}

export const AsyncActionDialog: FC<AsyncActionDialogProps> = (props) => (
  <ModalDialog
    title={props.title}
    footer={
      <>
        <CloseDialogButton />
        <SubmitButton
          submitting={props.submitting}
          disabled={props.loading || props.invalid}
          label={translate('Submit')}
        />
      </>
    }
  >
    {props.loading ? (
      <LoadingSpinner />
    ) : props.error ? (
      <>{translate('Unable to load data.')}</>
    ) : (
      props.children
    )}
  </ModalDialog>
);
