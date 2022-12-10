import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { translate } from '@cloudrock/i18n';
import {
  parseIntField,
  formatIntField,
} from '@cloudrock/marketplace/common/utils';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

import { IntegerUnitField } from './IntegerUnitField';

export const SystemVolumeSizeGroup: FunctionComponent<any> = (props) => (
  <FormGroup
    label={translate('System volume size')}
    required={true}
    labelClassName={props.labelClassName}
    valueClassName={props.valueClassName}
  >
    <Field
      name="system_volume_size"
      units={translate('GB')}
      component={IntegerUnitField}
      parse={parseIntField}
      format={formatIntField}
      validate={required}
    />
  </FormGroup>
);
