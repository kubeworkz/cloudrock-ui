import { FunctionComponent } from 'react';
import { useAsync } from 'react-use';

import { LoadingSpinner } from '@cloudrock/core/LoadingSpinner';
import { translate } from '@cloudrock/i18n';
import { CloseDialogButton } from '@cloudrock/modal/CloseDialogButton';
import { ModalDialog } from '@cloudrock/modal/ModalDialog';

import { loadOecdCodes } from './api';
import { ProjectUpdateContainer } from './ProjectUpdateContainer';

export const ProjectDetailsDialog: FunctionComponent<{
  resolve: { project };
}> = ({ resolve: { project } }) => {
  const { loading, value: oecdCodes } = useAsync(loadOecdCodes);
  return (
    <ModalDialog
      title={translate('Project details')}
      footer={<CloseDialogButton />}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectUpdateContainer project={project} oecdCodes={oecdCodes} />
      )}
    </ModalDialog>
  );
};
