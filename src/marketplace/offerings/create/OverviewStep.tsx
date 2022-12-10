import { FC } from 'react';

import { required } from '@cloudrock/core/validators';
import { isFeatureVisible } from '@cloudrock/features/connect';
import { StringField, FormContainer, FileUploadField } from '@cloudrock/form';
import { FormContainerProps } from '@cloudrock/form/FormContainer';
import { translate } from '@cloudrock/i18n';

import { ImageUploadField } from './ImageUploadField';
import { WysiwygEditor } from './WysiwygEditor';

export const OverviewStep: FC<FormContainerProps> = (props) => (
  <FormContainer {...props}>
    <StringField
      name="name"
      label={translate('Name')}
      required={true}
      validate={required}
      maxLength={150}
    />
    <WysiwygEditor name="description" label={translate('Description')} />
    <WysiwygEditor
      name="full_description"
      label={translate('Full description')}
    />
    <StringField
      name="privacy_policy_link"
      label={translate('Privacy policy link')}
      maxLength={200}
    />
    <WysiwygEditor
      name="terms_of_service"
      label={translate('Terms of Service')}
    />
    <StringField
      name="terms_of_service_link"
      label={translate('Terms of Service link')}
      maxLength={200}
    />
    <StringField
      name="access_url"
      label={translate('Access console link')}
      maxLength={200}
    />
    <ImageUploadField
      name="thumbnail"
      label={translate('Offering logo')}
      accept={['image/png', 'image/jpeg', 'image/svg+xml'].join(',')}
      buttonLabel={translate('Browse')}
    />
    {isFeatureVisible('marketplace.offering_document') ? (
      <FileUploadField
        name="document.file"
        showFileName={true}
        label={translate('Documents')}
        buttonLabel={translate('Browse')}
      />
    ) : null}
    {isFeatureVisible('marketplace.offering_document') ? (
      <StringField
        name="document.name"
        placeholder={translate('Filename')}
        maxLength={150}
      />
    ) : null}
  </FormContainer>
);

OverviewStep.defaultProps = {
  submitting: false,
  labelClass: 'col-sm-2',
  controlClass: 'col-sm-8',
  clearOnUnmount: false,
};
