import { FunctionComponent } from 'react';

import { FormContainer } from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';

export const OfferingPluginOptionsForm: FunctionComponent<{
  container;
}> = ({ container }) => (
  <FormContainer {...container}>
    <AwesomeCheckboxField
      name="auto_approve_in_service_provider_projects"
      label={translate('Auto approve in service provider projects')}
      hideLabel={true}
    />
  </FormContainer>
);
