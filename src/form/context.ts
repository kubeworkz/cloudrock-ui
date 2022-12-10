import { createContext } from 'react';

import { FormGroupProps } from '@cloudrock/marketplace/offerings/FormGroup';

interface FormLayoutContext {
  layout: 'vertical' | 'horizontal';
}

export const FormLayoutContext = createContext<FormLayoutContext>({
  layout: 'horizontal',
});

type FormFieldsContext = Pick<
  FormGroupProps,
  'labelClassName' | 'valueClassName' | 'classNameWithoutLabel'
> & {
  readOnlyFields?: Array<string>;
};

export const FormFieldsContext = createContext<FormFieldsContext>({
  labelClassName: undefined,
  valueClassName: undefined,
  classNameWithoutLabel: undefined,
  readOnlyFields: [],
});
