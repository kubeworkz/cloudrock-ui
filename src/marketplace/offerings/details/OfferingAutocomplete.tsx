import React from 'react';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { offeringsAutocomplete } from '@cloudrock/marketplace/common/autocompletes';
import { AutocompleteField } from '@cloudrock/marketplace/landing/AutocompleteField';

interface OfferingAutocompleteProps {
  offeringFilter?: object;
  className?: string;
}

export const OfferingAutocomplete: React.FC<OfferingAutocompleteProps> = (
  props,
) => (
  <div className={`form-group ${props.className}`}>
    <label className="control-label">{translate('Offering')}</label>
    <Field
      name="offering"
      component={(fieldProps) => (
        <AutocompleteField
          placeholder={translate('Select offering...')}
          loadOfferings={(query, prevOptions, { page }) =>
            offeringsAutocomplete(
              {
                name: query,
                ...props.offeringFilter,
              },
              prevOptions,
              page,
            )
          }
          value={fieldProps.input.value}
          onChange={(value) => fieldProps.input.onChange(value)}
          noOptionsMessage={() => translate('No offerings')}
        />
      )}
    />
  </div>
);

OfferingAutocomplete.defaultProps = {
  className: 'col-sm-3',
};
