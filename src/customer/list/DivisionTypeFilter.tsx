import { FunctionComponent } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Field } from 'redux-form';

import { divisionTypeAutocomplete } from '@cloudrock/customer/list/api';
import { translate } from '@cloudrock/i18n';

export const DivisionTypeFilter: FunctionComponent = () => (
  <div className="form-group col-sm-3">
    <label className="control-label">{translate('Division type')}</label>
    <Field
      name="division_type"
      component={(fieldProps) => (
        <AsyncPaginate
          placeholder={translate('Select division type...')}
          loadOptions={divisionTypeAutocomplete}
          defaultOptions
          getOptionValue={(option) => option.uuid}
          getOptionLabel={(option) => option.name}
          value={fieldProps.input.value}
          onChange={(value) => fieldProps.input.onChange(value)}
          noOptionsMessage={() => translate('No division types')}
          isMulti={true}
          isClearable={true}
          additional={{
            page: 1,
          }}
        />
      )}
    />
  </div>
);
