import { useRouter } from '@uirouter/react';
import { useState, FunctionComponent } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { getCustomer } from '@cloudrock/workspace/selectors';
import { Customer } from '@cloudrock/workspace/types';

import './SelectWorkspaceDialog.scss';
import { getCustomersCount } from './api';
import { EmptyOrganizationsPlaceholder } from './EmptyOrganizationsPlaceholder';
import { OrganizationsPanel } from './OrganizationsPanel';
import { ProjectsPanel } from './ProjectsPanel';

export const SelectWorkspaceDialog: FunctionComponent = () => {
  const currentCustomer = useSelector(getCustomer);
  const [selectedOrganization, selectOrganization] =
    useState<Customer>(currentCustomer);

  const router = useRouter();

  const {
    loading,
    error,
    value: organizationsCount,
  } = useAsync(getCustomersCount);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{translate('Select workspace')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          translate('Unable to load data')
        ) : organizationsCount === 0 ? (
          <EmptyOrganizationsPlaceholder />
        ) : (
          <Row>
            <OrganizationsPanel
              selectedOrganization={selectedOrganization}
              selectOrganization={selectOrganization}
              organizationsCount={organizationsCount}
            />
            <ProjectsPanel selectedOrganization={selectedOrganization} />
          </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => router.stateService.go('profile.details')}>
          {translate('Go to my profile')}
        </Button>
        <CloseDialogButton />
      </Modal.Footer>
    </>
  );
};
