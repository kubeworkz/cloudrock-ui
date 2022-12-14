import { FunctionComponent } from 'react';
import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'react-bootstrap';

import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';

import { UserDetailsTable } from './UserDetailsTable';

export const UserDetailsDialog: FunctionComponent<{ resolve }> = ({
  resolve,
}) => {
  return (
    <>
      <ModalHeader>
        <ModalTitle>{translate('User details')}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <UserDetailsTable user={resolve.user} />
      </ModalBody>
      <ModalFooter>
        <CloseDialogButton />
      </ModalFooter>
    </>
  );
};
