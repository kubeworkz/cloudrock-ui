import { useEffect, FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate, formatJsxTemplate } from '@cloudrock/i18n';
import { openIssueCreateDialog } from '@cloudrock/issues/create/actions';
import { ISSUE_IDS } from '@cloudrock/issues/types/constants';
import { closeModalDialog } from '@cloudrock/modal/actions';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';

export const CustomerErrorDialog: FunctionComponent<{ resolve }> = ({
  resolve,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (ENV.plugins.CLOUDROCK_SUPPORT) {
      dispatch(closeModalDialog());
      dispatch(
        openIssueCreateDialog({
          issue: {
            type: ISSUE_IDS.SERVICE_REQUEST,
            summary: translate('Incorrect organization details'),
            customer: resolve.customer,
          },
        }),
      );
    }
  }, [dispatch, resolve]);
  return (
    <>
      <ModalHeader>
        <ModalTitle>{translate('Incorrect organization details')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL
          ? translate(
              'To correct details of your organization, please send an email to {supportEmail} highlighting the errors in current details. Thank you!',
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
