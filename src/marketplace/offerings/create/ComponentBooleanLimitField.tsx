import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

export const ComponentBooleanLimitField: FunctionComponent = () => (
  <FormGroup>
    <Field
      name="is_boolean"
      component={AwesomeCheckboxField}
      label={translate('Allow to enable/disable component only')}
    />
  </FormGroup>
);
