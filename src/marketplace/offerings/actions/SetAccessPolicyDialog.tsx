import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { getAllOrganizationDivisions } from '@cloudrock/marketplace/common/api';
import { SetAccessPolicyDialogForm } from '@cloudrock/marketplace/offerings/actions/SetAccessPolicyDialogForm';
import { Offering } from '@cloudrock/marketplace/types';

interface SetAccessPolicyDialogProps {
  resolve: { offering: Offering };
}

export const SetAccessPolicyDialog: FunctionComponent<SetAccessPolicyDialogProps> =
  ({ resolve }) => {
    const {
      loading,
      error,
      value: divisions,
    } = useAsync(async () => await getAllOrganizationDivisions(), [resolve]);
    return loading ? (
      <LoadingSpinner />
    ) : error ? (
      <>{translate('Unable to load divisions.')}</>
    ) : (
      <SetAccessPolicyDialogForm
        divisions={divisions}
        offering={resolve.offering}
      />
    );
  };
