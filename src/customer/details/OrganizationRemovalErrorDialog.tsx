import { FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate, formatJsxTemplate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { getCustomer } from '@cloudrock/workspace/selectors';

export const OrganizationRemovalErrorDialog: FunctionComponent = () => {
  const customer = useSelector(getCustomer);
  return (
    <>
      <ModalHeader>
        <ModalTitle>
          {translate('Removing organization {organizationName}', {
            organizationName: customer.name,
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        {ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL
          ? translate(
              'To remove your organization, please send an email to {supportEmail}. Thank you!',
              {
                supportEmail: (
                  <a href={`mailto:${ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL}`}>
                    {ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL}
                  </a>
                ),
              },
              formatJsxTemplate,
            )
          : null}
      </ModalBody>
      <ModalFooter>
        <CloseDialogButton />
      </ModalFooter>
    </>
  );
};
