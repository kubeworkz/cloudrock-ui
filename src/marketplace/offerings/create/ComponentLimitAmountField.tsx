import React from 'react';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';
import {
  formatIntField,
  parseIntField,
} from '@cloudrock/marketplace/common/utils';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

export const ComponentLimitAmountField: React.FC = () => (
  <FormGroup label={translate('Limit amount')}>
    <Field
      component="input"
      className="form-control"
      name="limit_amount"
      type="number"
      min={0}
      parse={parseIntField}
      format={formatIntField}
    />
  </FormGroup>
);
