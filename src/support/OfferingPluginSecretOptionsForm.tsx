import { FunctionComponent } from 'react';

import { FormContainer, TextField } from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';

export const OfferingPluginSecretOptionsForm: FunctionComponent<{
  container;
}> = ({ container }) => (
  <FormContainer {...container}>
    <TextField
      name="template_confirmation_comment"
      label={translate('Confirmation notification template')}
    />
    <AwesomeCheckboxField
      name="service_provider_can_create_offering_user"
      label={translate('Allow service provider to create offering users.')}
      hideLabel={true}
    />
  </FormContainer>
);
