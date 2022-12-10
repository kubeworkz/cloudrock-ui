import { FC } from 'react';
import { Field } from 'redux-form';

import { translate } from '@cloudrock/i18n';

import { FormField } from './FormField';

export const ProtocolField: FC = () => (
  <Field name="protocol" component={FormField} componentClass="select" required>
    <option value="any">{translate('Any')}</option>
    <option value="tcp">TCP</option>
    <option value="udp">UDP</option>
    <option value="icmp">ICMP</option>
  </Field>
);
