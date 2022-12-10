import { FunctionComponent } from 'react';

import { required } from '@cloudrock/core/validators';
import { AsyncSelectField } from '@cloudrock/form/AsyncSelectField';
import { reactSelectMenuPortaling } from '@cloudrock/form/utils';
import { translate } from '@cloudrock/i18n';
import { organizationAutocomplete } from '@cloudrock/marketplace/common/autocompletes';

interface MoveToOrganizationAutocompleteProps {
  isDisabled: boolean;
}

export const MoveToOrganizationAutocomplete: FunctionComponent<MoveToOrganizationAutocompleteProps> =
  ({ isDisabled }) => (
    <div className="form-group">
      <label className="control-label">
        {translate('Move to organization')}
        <span className="text-danger"> *</span>
      </label>
      <AsyncSelectField
        name="organization"
        validate={required}
        placeholder={translate('Select organization...')}
        loadOptions={(query, prevOptions, page) =>
          organizationAutocomplete(query, prevOptions, page, {
            field: ['name', 'url'],
            o: 'name',
          })
        }
        getOptionValue={(option) => option.url}
        noOptionsMessage={() => translate('No organizations')}
        isDisabled={isDisabled}
        {...reactSelectMenuPortaling()}
      />
    </div>
  );
