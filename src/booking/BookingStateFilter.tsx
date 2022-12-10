import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';

export interface BookingFilterStateOption {
  value: string;
  label: string;
}

export const getStates = (): BookingFilterStateOption[] => [
  { value: 'Creating', label: translate('Unconfirmed') },
  { value: 'OK', label: translate('Accepted') },
  { value: 'Terminated', label: translate('Rejected') },
];

export const BookingStateFilter: FunctionComponent = () => (
  <div className="form-group">
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
