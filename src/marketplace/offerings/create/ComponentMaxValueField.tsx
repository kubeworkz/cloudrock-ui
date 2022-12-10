import React from 'react';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

import { OptionalNumberField } from './OptionalNumberField';

export const ComponentMaxValueField: React.FC = () => (
  <FormGroup label={translate('Maximum allowed value')}>
    <Field component={OptionalNumberField} name="max_value" />
  </FormGroup>
);
