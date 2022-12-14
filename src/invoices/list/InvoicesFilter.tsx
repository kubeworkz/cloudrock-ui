import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { getConfig } from '@cloudrock/store/config';
import { RootState } from '@cloudrock/store/reducers';
import { ToogleButtonFilter } from '@cloudrock/table/ToggleButtonFilter';

const PureInvoicesFilter = () => {
  const accountingMode = useSelector(
    (state: RootState) => getConfig(state).accountingMode,
  );

  const choices = useMemo(() => {
    const result = [
      {
        label: translate('Pending'),
        value: 'pending',
      },
      {
        label: translate('Canceled'),
        value: 'canceled',
      },
      {
        label: translate('Created'),
        value: 'created',
      },
    ];

    if (accountingMode !== 'accounting') {
      result.push({
        label: translate('Paid'),
        value: 'paid',
      });
    }

    return result;
  }, [accountingMode]);

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
  form: 'InvoicesFilter',
});

export const InvoicesFilter = enhance(PureInvoicesFilter);
