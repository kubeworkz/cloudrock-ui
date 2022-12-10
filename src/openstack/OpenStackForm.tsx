import { FunctionComponent } from 'react';

import { required } from '@cloudrock/core/validators';
import { StringField, SecretField, FormContainer } from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';

export const OpenStackForm: FunctionComponent<{ translate; container }> = ({
  translate,
  container,
}) => (
  <FormContainer {...container}>
    <StringField
      name="backend_url"
      label={translate('API URL')}
      required={true}
      validate={required}
      description={translate(
        'Keystone auth URL (e.g. http://keystone.example.com:5000/v3)',
      )}
    />
    <StringField name="domain" label={translate('Domain name')} />
    <StringField
      name="username"
      label={translate('Username')}
      required={true}
      validate={required}
      description={translate('Tenant user username')}
    />
    <SecretField
      name="password"
      label={translate('Password')}
      required={true}
      validate={required}
      description={translate('Tenant user password')}
    />
    <StringField
      name="tenant_name"
      label={translate('Tenant name')}
      required={true}
      validate={required}
    />
    <StringField
      name="external_network_id"
      label={translate('External network ID')}
      required={true}
      validate={required}
      description={translate(
        'It is used to automatically assign floating IP to your virtual machine.',
      )}
    />
    <StringField
      name="availability_zone"
      label={translate('Availability zone')}
      description={translate(
        'Default availability zone for provisioned instances.',
      )}
    />
    <AwesomeCheckboxField
      hideLabel={true}
      label={translate('Verify server certificate')}
      name="verify_ssl"
    />
  </FormContainer>
);
