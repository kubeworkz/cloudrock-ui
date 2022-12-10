import { FunctionComponent } from 'react';
import { Col, FormGroup, Row } from 'react-bootstrap';
import { Field } from 'redux-form';

import {
  FormContainer,
  SecretField,
  StringField,
  TextField,
} from '@cloudrock/form';
import { AwesomeCheckboxField } from '@cloudrock/form/AwesomeCheckboxField';
import { translate } from '@cloudrock/i18n';

export const RemoteOfferingSecretOptions: FunctionComponent<{
  container;
}> = ({ container }) => (
  <FormContainer {...container}>
    <TextField
      name="template_confirmation_comment"
      label={translate('Confirmation notification template')}
    />
    <FormGroup>
      <Col sm={2}></Col>
      <Row>
        <Col sm={8}>
          <Field
            name="service_provider_can_create_offering_user"
            component={(fieldProps) => (
              <AwesomeCheckboxField
                label={translate(
                  'Allow service provider to create offering users.',
                )}
                hideLabel={true}
                {...fieldProps}
              />
            )}
          />
        </Col>
      </Row>
    </FormGroup>
    <StringField name="api_url" label={translate('API URL')} />
    <SecretField name="token" label={translate('Token')} />
    <StringField name="customer_uuid" label={translate('Organization UUID')} />
  </FormContainer>
);
