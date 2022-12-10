import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { formatFilesize } from '@cloudrock/core/utils';
import { required } from '@cloudrock/core/validators';
import { renderValidationWrapper } from '@cloudrock/form/FieldValidationWrapper';
import { SelectDialogField } from '@cloudrock/form/SelectDialogField';
import { translate } from '@cloudrock/i18n';
import { PriceTooltip } from '@cloudrock/price/PriceTooltip';

import { CreateResourceFormGroup } from '../CreateResourceFormGroup';

export const ImageGroup: FunctionComponent<any> = (props) => (
  <CreateResourceFormGroup label={translate('Image')} required={true}>
    <Field
      name="attributes.image"
      validate={required}
      component={renderValidationWrapper((fieldProps) => (
        <SelectDialogField
          id="image"
          columns={[
            {
              label: translate('Image name'),
              name: 'name',
            },
            {
              label: (
                <>
                  {translate('Min RAM')} <PriceTooltip />
                </>
              ),
              name: 'min_ram',
              filter: formatFilesize,
            },
            {
              label: translate('Min storage'),
              name: 'min_disk',
              filter: formatFilesize,
            },
          ]}
          choices={props.images}
          input={{
            name: fieldProps.input.name,
            value: fieldProps.input.value,
            onChange: (value) => {
              fieldProps.input.onChange(value);
              props.validateFlavor(value);
            },
          }}
        />
      ))}
    />
  </CreateResourceFormGroup>
);
