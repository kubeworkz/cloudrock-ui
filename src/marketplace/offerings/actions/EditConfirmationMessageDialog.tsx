import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getProviderOffering } from '@cloudrock/marketplace/common/api';
import { EditConfirmationMessageForm } from '@cloudrock/marketplace/offerings/actions/EditConfirmationMessageForm';

interface EditConfirmationMessageDialogProps {
  resolve: { offeringUuid: string };
}

export const EditConfirmationMessageDialog: FunctionComponent<EditConfirmationMessageDialogProps> =
  ({ resolve }) => {
    const {
      loading,
      error,
      value: offering,
    } = useAsync(
      async () => await getProviderOffering(resolve.offeringUuid),
      [resolve.offeringUuid],
    );
    return loading ? (
      <LoadingSpinner />
    ) : error ? (
      <>{translate('Unable to load offering.')}</>
    ) : (
      <EditConfirmationMessageForm offering={offering} />
    );
  };
