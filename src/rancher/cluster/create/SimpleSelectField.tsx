import { FunctionComponent } from 'react';

import { FieldError } from '@cloudrock/form';
import { SelectControl } from '@cloudrock/form/SelectControl';

export const SimpleSelectField: FunctionComponent<any> = (props) => (
  <>
    <SelectControl
      value={props.options.filter(({ value }) => value === props.input.value)}
      onChange={({ value }) => props.input.onChange(value)}
      options={props.options}
      isClearable={false}
    />
    {props.meta.touched && <FieldError error={props.meta.error} />}
  </>
);
