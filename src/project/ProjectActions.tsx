import { FunctionComponent } from 'react';

import { lazyComponent } from '@cloudrock/core/lazyComponent';
import { ActionList } from '@cloudrock/dashboard/ActionList';
import { getIssueAction } from '@cloudrock/dashboard/ReportIssueAction';
import { getSupportPortalAction } from '@cloudrock/dashboard/SupportPortalAction';
import { translate } from '@cloudrock/i18n';
import { openModalDialog } from '@cloudrock/modal/actions';
import { router } from '@cloudrock/router';
import store from '@cloudrock/store/store';
import { Project, User } from '@cloudrock/workspace/types';

const ProjectDetailsDialog = lazyComponent(
  () =>
    import(
      /* webpackChunkName: "ProjectDetailsDialog" */ './ProjectDetailsDialog'
    ),
  'ProjectDetailsDialog',
);

interface ProjectActionsProps {
  user: User;
  project: Project;
  canAddUser: boolean;
}

const getDetailsAction = (project) => ({
  title: translate('Details'),
  onClick() {
    store.dispatch(
      openModalDialog(ProjectDetailsDialog, {
        size: 'lg',
        resolve: {
          project,
        },
      }),
    );
  },
});

const getTeamAction = (props: ProjectActionsProps) => {
  if (!props.canAddUser) {
    return undefined;
  }
  return {
    title: translate('Add team member'),
    onClick() {
      router.stateService.go('project.team');
    },
  };
};

export const ProjectActions: FunctionComponent<ProjectActionsProps> = (
  props,
) => {
  const actions = [
    getDetailsAction(props.project),
    getTeamAction(props),
    getIssueAction({
      issue: { project: props.project },
    }),
    getSupportPortalAction(),
  ].filter((action) => action !== undefined);
  return <ActionList actions={actions} />;
};
