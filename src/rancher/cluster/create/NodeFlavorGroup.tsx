import React, { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { required } from '@cloudrock/core/validators';
import { SelectControl } from '@cloudrock/form/SelectControl';
import { translate } from '@cloudrock/i18n';
import { FormGroup } from '@cloudrock/marketplace/offerings/FormGroup';

import { LonghornWorkerWarning } from './LonghornWorkerWarning';

const SelectFlavorField: FunctionComponent<any> = (props) => (
  <SelectControl
    value={props.input.value}
    onChange={props.input.onChange}
    options={props.options}
    isClearable={true}
  />
);

interface NodeFlavorGroupProps {
  labelClassName?: string;
  valueClassName?: string;
  nodeIndex?: number;
  options: any[];
}

export const NodeFlavorGroup: React.FC<NodeFlavorGroupProps> = (props) => {
  return (
    <FormGroup
      label={translate('Flavor')}
      required={true}
      labelClassName={props.labelClassName}
      valueClassName={props.valueClassName}
    >
      <Field
        name="flavor"
        component={SelectFlavorField}
        options={props.options}
        validate={required}
        isClearable={true}
      />
      {typeof props.nodeIndex === 'number' ? (
        <LonghornWorkerWarning nodeIndex={props.nodeIndex} />
      ) : null}
    </FormGroup>
  );
};
