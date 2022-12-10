import { useEffect, FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { ENV } from '@cloudrock/configs/default';
import { translate } from '@cloudrock/i18n';
import { openIssueCreateDialog } from '@cloudrock/issues/create/actions';
import { ISSUE_IDS } from '@cloudrock/issues/types/constants';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { getCustomer, getUser } from '@cloudrock/workspace/selectors';

export const RequestActionDialog: FunctionComponent<{
  resolve: { offering; offeringRequestMode };
  close;
}> = ({ resolve: { offering, offeringRequestMode }, close }) => {
  const dispatch = useDispatch();
  const customer = useSelector(getCustomer);
  const user = useSelector(getUser);
  useEffect(() => {
    if (ENV.plugins.CLOUDROCK_SUPPORT) {
      close();
      dispatch(
        openIssueCreateDialog({
          issue: {
            type: ISSUE_IDS.SERVICE_REQUEST,
            summary: translate('Request {mode} of public offering', {
              mode: offeringRequestMode,
            }),
            description:
              offeringRequestMode === 'publishing'
                ? translate(
                    'Please review and activate offering {offeringName} ({offeringUuid}). \n' +
                      'Requestor: {userName} / {userUuid}. \n' +
                      'Service provider: {customerName} / {customerUuid}',
                    {
                      offeringName: offering.name,
                      offeringUuid: offering.uuid,
                      userName: user.full_name,
                      userUuid: user.uuid,
                      customerName: customer.name,
                      customerUuid: customer.uuid,
                    },
                  )
                : translate(
                    'Please open offering {offeringName} ({offeringUuid}) for editing. \n' +
                      'Requestor: {userName} / {userUuid}. \n' +
                      'Service provider: {customerName} / {customerUuid}',
                    {
                      offeringName: offering.name,
                      offeringUuid: offering.uuid,
                      userName: user.full_name,
                      userUuid: user.uuid,
                      customerName: customer.name,
                      customerUuid: customer.uuid,
                    },
                  ),
            resource: {
              ...offering,
              url: undefined,
            },
            offeringRequestMode,
          },
          options: {
            title: translate('Request {mode} of public offering', {
              mode: offeringRequestMode,
            }),
            descriptionPlaceholder: translate('Please provide a reason'),
            descriptionLabel: translate('Description'),
            hideTitle: true,
          },
        }),
      );
    }
  });
  return (
    <>
      <ModalHeader>
        <ModalTitle>
          {translate('Request {mode} of {name}', {
            name: offering.name,
            mode: offeringRequestMode,
          })}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <p>
          {translate(
            'Please note that request should specify offering and provide a reason.',
          )}
        </p>
      </ModalBody>
      <ModalFooter>
        <CloseDialogButton />
      </ModalFooter>
    </>
  );
};
