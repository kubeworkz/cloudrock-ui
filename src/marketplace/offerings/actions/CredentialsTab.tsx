import { required } from '@cloudrock/core/validators';
import { StringField, FormContainer, SecretField } from '@cloudrock/form';
import { TranslateProps, withTranslation } from '@cloudrock/i18n';

export const CredentialsTab = withTranslation((props: TranslateProps) => (
  <FormContainer submitting={false} layout="vertical" clearOnUnmount={false}>
    <StringField
      name="api_url"
      label={props.translate('Remote Cloudrock API URL')}
      required={true}
      validate={required}
      maxLength={150}
    />
    <SecretField
      name="token"
      label={props.translate('Authentication token')}
      required={true}
      validate={required}
    />
  </FormContainer>
));
