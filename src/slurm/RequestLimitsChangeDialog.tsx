import { useEffect, FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { openIssueCreateDialog } from '@cloudrock/issues/create/actions';
import { ISSUE_IDS } from '@cloudrock/issues/types/constants';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';

export const RequestLimitsChangeDialog: FunctionComponent<{
  resolve: { resource };
  close;
}> = ({ resolve: { resource }, close }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (ENV.plugins.CLOUDROCK_SUPPORT) {
      close();
      dispatch(
        openIssueCreateDialog({
          issue: {
            type: ISSUE_IDS.CHANGE_REQUEST,
            summary: translate('Request change of limits of SLURM allocation'),
            resource,
          },
          options: {
            title: translate('Request change of limits of SLURM allocation'),
            descriptionPlaceholder: translate(
              'Please provide requested limits and a reason.',
            ),
            descriptionLabel: translate('Description'),
            hideTitle: true,
          },
          hideProjectAndResourceFields: true,
        }),
      );
    }
  });
  return (
    <>
      <ModalHeader>
        <ModalTitle>
          {translate('Change of limits of SLURM allocation {name}', {
            name: resource.name,
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>
          {translate(
            'To change allocation limits, please send a request to {supportEmail}.',
            { supportEmail: ENV.plugins.CLOUDROCK_CORE.SITE_EMAIL },
          )}
        </p>
        <p>
          {translate(
            'Please note that request should specify allocation name and provide a reason for change.',
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <CloseDialogButton />
      </ModalFooter>
    </>
  );
};
