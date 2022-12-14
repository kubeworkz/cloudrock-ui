import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';

export const getOptions = () => [
  { value: true, label: translate('Running accounting') },
  { value: false, label: translate('Not running accounting') },
  { value: undefined, label: translate('All') },
];

export const AccountingRunningField: FunctionComponent = () => (
  <Field
    name="accounting_is_running"
    component={(prop) => (
      <Select
        placeholder={translate('Show with running accounting')}
        value={prop.input.value}
        onChange={(value) => prop.input.onChange(value)}
        options={getOptions()}
        isClearable={false}
      />
    )}
  />
);
