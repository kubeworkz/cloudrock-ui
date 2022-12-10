import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { translate } from '@cloudrock/i18n/translate';
import { openModalDialog } from '@cloudrock/modal/actions';
import { ActionButton } from '@cloudrock/table/ActionButton';
import { Project } from '@cloudrock/workspace/types';

const ProjectDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectDetailsDialog" */ './ProjectDetailsDialog'
    ),
  'ProjectDetailsDialog',
);

const openProjectDialog = (project: Project) =>
  openModalDialog(ProjectDetailsDialog, { resolve: { project }, size: 'lg' });

export const ProjectDetailsButton = ({ project }: { project: Project }) => {
  const dispatch = useDispatch();
  const callback = useCallback(
    () => dispatch(openProjectDialog(project)),
    [dispatch, project],
  );
  return (
    <ActionButton
      title={translate('Details')}
      action={callback}
      icon="fa fa-eye"
    />
  );
};
