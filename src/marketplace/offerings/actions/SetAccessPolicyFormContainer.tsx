import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { AwesomeCheckbox } from '@cloudrock/core/AwesomeCheckbox';
import { FormContainer } from '@cloudrock/form';
import { Division } from '@cloudrock/marketplace/types';

interface SetAccessPolicyFormContainerProps {
  divisions: Division[];
  submitting: boolean;
  layout?: 'horizontal' | 'vertical';
}

export const SetAccessPolicyFormContainer: FunctionComponent<SetAccessPolicyFormContainerProps> =
  ({ divisions, submitting, layout }) => (
    <FormContainer
      submitting={submitting}
      labelClass={layout === 'vertical' ? '' : 'col-sm-2'}
      controlClass={layout === 'vertical' ? 'col-sm-12' : 'col-sm-8'}
    >
      {divisions.map((division) => (
        <Field
          key={division.uuid}
          name={division.uuid}
          component={(prop) => (
            <AwesomeCheckbox label={division.name} {...prop.input} />
          )}
        />
      ))}
    </FormContainer>
  );

SetAccessPolicyFormContainer.defaultProps = {
  layout: 'horizontal',
};
