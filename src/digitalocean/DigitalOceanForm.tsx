import { FunctionComponent } from 'react';

import { SecretField, FormContainer } from '@cloudrock/form';

export const DigitalOceanForm: FunctionComponent<{ translate; container }> = ({
  translate,
  container,
}) => (
  <FormContainer {...container}>
    <SecretField
      name="token"
      label={translate('Access token')}
      required={true}
    />
  </FormContainer>
);
