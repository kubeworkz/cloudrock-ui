import { FunctionComponent } from 'react';
import { Field } from 'redux-form';

import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';

import { LayoutWrapper } from './LayoutWrapper';

export const SummaryGroup: FunctionComponent<{ layout; disabled }> = ({
  layout,
  disabled,
}) => (
  <LayoutWrapper
    layout={layout}
    header={
      <>
        {translate('Title')}
        <span className="text-danger">*</span>
      </>
    }
    body={
      <Field
        name="summary"
        component={InputField}
        type="text"
        required={true}
        disabled={disabled}
      />
    }
  />
);
