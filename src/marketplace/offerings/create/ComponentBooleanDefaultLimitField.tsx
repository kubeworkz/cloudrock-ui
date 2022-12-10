import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

export const ComponentBooleanDefaultLimitField: FunctionComponent = () => (
  <FormGroup>
    <Field
      name="default_limit"
      component={AwesomeCheckboxField}
      label={translate('Enable by default')}
      parse={Boolean}
      normalize={(v) => (v ? 1 : 0)}
    />
  </FormGroup>
);
