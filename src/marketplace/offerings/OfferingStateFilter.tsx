import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';

export const getStates = () => [
  { value: 'Draft', label: translate('Draft') },
  { value: 'Active', label: translate('Active') },
  { value: 'Paused', label: translate('Paused') },
  { value: 'Archived', label: translate('Archived') },
];

export const OfferingStateFilter: FunctionComponent = () => (
  <div className="form-group col-sm-3">
    <label className="control-label">{translate('State')}</label>
    <Field
      name="state"
      component={(fieldProps) => (
        <Select
          placeholder={translate('Select state...')}
          options={getStates()}
          value={fieldProps.input.value}
          onChange={(value) => fieldProps.input.onChange(value)}
          isMulti={true}
          isClearable={true}
        />
      )}
    />
  </div>
);
