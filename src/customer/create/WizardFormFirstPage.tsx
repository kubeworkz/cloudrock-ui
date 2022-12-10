import { FunctionComponent } from 'react';
import { PanelBody } from 'react-bootstrap';

import { ENV } from '@cloudrock/configs/default';
import { getNameFieldValidators } from '@cloudrock/core/validators';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { InputField } from '@cloudrock/form/InputField';
import { translate } from '@cloudrock/i18n';

import { DomainGroup } from './DomainGroup';
import { ImageFileField } from './ImageFileField';
import { InputGroup } from './InputGroup';
import { WizardForm } from './WizardForm';

export const WizardFormFirstPage: FunctionComponent<any> = (props) => (
  <WizardForm {...props}>
    <PanelBody>
      <InputGroup
        name="name"
        component={InputField}
        required={true}
        label={translate('Name')}
        maxLength={150}
        helpText={translate('Name of your organization.')}
        validate={getNameFieldValidators()}
      />
      {ENV.plugins.CLOUDROCK_CORE.NATIVE_NAME_ENABLED === true && (
        <InputGroup
          name="native_name"
          component={InputField}
          label={translate('Native name')}
          maxLength={160}
        />
      )}
      {isFeatureVisible('customer.show_domain') && <DomainGroup />}
      <InputGroup
        name="email"
        component={InputField}
        type="email"
        label={translate('Contact email')}
        required={true}
      />
      <InputGroup
        name="phone_number"
        component={InputField}
        type="tel"
        label={translate('Contact phone')}
      />
      <InputGroup
        name="homepage"
        component={InputField}
        label={translate('Website URL')}
        type="url"
        pattern="https?://.+"
      />
      <InputGroup
        name="image"
        component={ImageFileField}
        type="file"
        label={translate('Logo')}
      />
    </PanelBody>
  </WizardForm>
);
