import { FunctionComponent } from 'react';

import { FieldError } from '@cloudrock/form';

export const IntegerUnitField: FunctionComponent<any> = (props) => (
  <>
    <div className="input-group" style={{ maxWidth: 200 }}>
      <input {...props.input} type="number" className="form-control" min="0" />
      <span className="input-group-addon">{props.units}</span>
    </div>
    {props.meta.touched && <FieldError error={props.meta.error} />}
  </>
);
