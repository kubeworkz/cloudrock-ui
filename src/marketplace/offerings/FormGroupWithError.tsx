import { FieldError } from '@cloudrock/form';

import { FormGroup } from './FormGroup';

export const FormGroupWithError = (inputProps) => (
  <FormGroup
    label={inputProps.label}
    description={inputProps.description}
    required={inputProps.required}
    className={
      inputProps.meta.touched && inputProps.meta.error
        ? 'form-group has-error'
        : 'form-group'
    }
  >
    <input
      {...inputProps.input}
      disabled={inputProps.disabled}
      readOnly={inputProps.readOnly}
      className="form-control"
      type="text"
    />
    {inputProps.meta.touched && <FieldError error={inputProps.meta.error} />}
  </FormGroup>
);
