import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { translate } from '@cloudrock/i18n';

import { CreateResourceFormGroup } from '../CreateResourceFormGroup';

import { SimpleSelectField } from './SimpleSelectField';

export const SystemVolumeTypeGroup: FunctionComponent<any> = (props) =>
  props.volumeTypes.length > 0 ? (
    <CreateResourceFormGroup
      label={translate('System volume type')}
      required={true}
    >
      <Field
        name="attributes.system_volume_type"
        options={props.volumeTypes}
        component={SimpleSelectField}
        validate={required}
        isClearable={true}
      />
    </CreateResourceFormGroup>
  ) : null;
