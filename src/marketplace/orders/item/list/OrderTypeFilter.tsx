import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';

export const OrderTypeFilter: FunctionComponent = () => (
  <div className="form-group col-sm-3">
    <label className="control-label">{translate('Type')}</label>
    <Field
      name="type"
      component={(fieldProps) => (
        <Select
          placeholder={translate('Select type...')}
          options={[
            { value: 'Create', label: translate('Create') },
            { value: 'Update', label: translate('Update') },
            { value: 'Terminate', label: translate('Terminate') },
          ]}
          value={fieldProps.input.value}
          onChange={(value) => fieldProps.input.onChange(value)}
          isClearable={true}
        />
      )}
    />
  </div>
);
