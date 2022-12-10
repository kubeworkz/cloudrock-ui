import { createFormAction } from 'redux-form-saga';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { openModalDialog } from '@cloudrock/modal/actions';
import { Project } from '@cloudrock/workspace/types';

const ProjectRemoveDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectRemoveDialog" */ './ProjectRemoveDialog'
    ),
  'ProjectRemoveDialog',
);

export const createProject = createFormAction('cloudrock/project/CREATE');
export const updateProject = createFormAction('cloudrock/project/UPDATE');
export const moveProject = createFormAction('cloudrock/project/MOVE');
export const gotoProjectList = createFormAction('cloudrock/project/GOTO_LIST');

export const GOTO_PROJECT_CREATE = 'cloudrock/project/GOTO_CREATE';
export const DELETE_PROJECT = 'cloudrock/project/DELETE';
export const UPDATE_PROJECT_COUNTERS = 'cloudrock/project/COUNTERS';

export const gotoProjectCreate = () => ({
  type: GOTO_PROJECT_CREATE,
});

export const deleteProject = (project: Project) => ({
  type: DELETE_PROJECT,
  payload: { project },
});

export const showProjectRemoveDialog = (
  action: () => void,
  projectName: string,
) =>
  openModalDialog(ProjectRemoveDialog, {
    resolve: { action, projectName },
    size: 'lg',
  });

export const updateProjectCounters = (counters) => ({
  type: UPDATE_PROJECT_COUNTERS,
  payload: { counters },
});
