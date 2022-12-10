import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { formatFilesize } from '@cloudrock/core/utils';
import { required } from '@cloudrock/core/validators';
import { SelectDialogField } from '@cloudrock/form/SelectDialogField';
import { translate } from '@cloudrock/i18n';

import { CreateResourceFormGroup } from '../CreateResourceFormGroup';

export const FlavorGroup: FunctionComponent<{ flavors }> = (props) => (
  <CreateResourceFormGroup label={translate('Flavor')} required={true}>
    <Field
      name="attributes.flavor"
      validate={required}
      component={(fieldProps) => (
        <SelectDialogField
          id="flavor"
          columns={[
            {
              label: translate('Flavor name'),
              name: 'name',
            },
            {
              label: 'vCPU',
              name: 'cores',
            },
            {
              label: 'RAM',
              name: 'ram',
              filter: formatFilesize,
            },
            {
              label: translate('Storage'),
              name: 'disk',
              filter: formatFilesize,
            },
          ]}
          choices={props.flavors}
          input={fieldProps.input}
        />
      )}
    />
  </CreateResourceFormGroup>
);
