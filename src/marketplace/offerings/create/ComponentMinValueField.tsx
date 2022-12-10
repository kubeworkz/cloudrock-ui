import React from 'react';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

import { OptionalNumberField } from './OptionalNumberField';

export const ComponentMinValueField: React.FC = () => (
  <FormGroup label={translate('Minimum allowed value')}>
    <Field component={OptionalNumberField} name="min_value" />
  </FormGroup>
);
