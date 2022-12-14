import { useMemo } from 'react';
import { Field, reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { ToogleButtonFilter } from '@cloudrock/table/ToggleButtonFilter';

const PureInvitationsFilter = () => {
  const choices = useMemo(
    () => [
      {
        label: translate('Requested'),
        value: 'requested',
      },
      {
        label: translate('Rejected'),
        value: 'rejected',
      },
      {
        label: translate('Pending'),
        value: 'pending',
      },
      {
        label: translate('Canceled'),
        value: 'canceled',
      },
      {
        label: translate('Expired'),
        value: 'expired',
      },
      {
        label: translate('Accepted'),
        value: 'accepted',
      },
    ],
    [],
  );

  return (
    <Field
      name="state"
      normalize={(value) =>
        Array.isArray(value) ? value.filter((x) => x) : value
      }
      component={(props) => (
        <ToogleButtonFilter choices={choices} {...props.input} />
      )}
    />
  );
};

const enhance = reduxForm({
  form: 'InvitationsFilter',
  initialValues: {
    state: 'pending',
  },
});

export const InvitationsFilter = enhance(PureInvitationsFilter);
