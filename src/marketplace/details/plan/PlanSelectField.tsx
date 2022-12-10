import { FunctionComponent } from 'react';
import Select from 'react-select';
import { Field } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { FieldError } from '@cloudrock/form';
import { Plan } from '@cloudrock/marketplace/types';

interface PlanSelectFieldProps {
  plans: Plan[];
}

const isDisabled = (plans) => {
  return plans.length === 1;
};

export const PlanSelectField: FunctionComponent<PlanSelectFieldProps> = (
  props,
) => (
  <Field
    name="plan"
    validate={[required]}
    component={(fieldProps) => (
      <>
        <Select
          value={fieldProps.input.value}
          onChange={(value) => fieldProps.input.onChange(value)}
          getOptionValue={(option) => option.url}
          getOptionLabel={(option) => option.name}
          options={props.plans}
          isClearable={false}
          isDisabled={isDisabled(props.plans)}
        />
        {fieldProps.meta.touched && (
          <FieldError error={fieldProps.meta.error} />
        )}
      </>
    )}
  />
);
